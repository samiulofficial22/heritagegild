/* ============================================
   COMPONENT LOADER SYSTEM
   Handles loading and rendering reusable components
   ============================================ */

class ComponentLoader {
    constructor() {
        this.components = new Map();
        this.templates = new Map();
    }

    /**
     * Register a component
     */
    register(name, component) {
        this.components.set(name, component);
    }

    /**
     * Load component template from file
     */
    async loadTemplate(path) {
        if (this.templates.has(path)) {
            return this.templates.get(path);
        }

        try {
            const response = await fetch(path);
            const html = await response.text();
            this.templates.set(path, html);
            return html;
        } catch (error) {
            console.error(`Error loading template ${path}:`, error);
            return null;
        }
    }

    /**
     * Render component
     */
    async render(componentName, containerId, data = {}) {
        const component = this.components.get(componentName);
        if (!component) {
            console.error(`Component ${componentName} not found`);
            return;
        }

        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        // Load template if needed
        if (component.template && !component.templateContent) {
            component.templateContent = await this.loadTemplate(component.template);
        }

        // Render component
        const html = component.render ? component.render(data) : component.templateContent;
        
        if (html) {
            container.innerHTML = html;
            
            // Initialize component if method exists
            if (component.init) {
                component.init(container, data);
            }
        }
    }

    /**
     * Render component from HTML template string
     */
    renderFromTemplate(template, data) {
        let html = template;
        
        // Replace placeholders with data
        Object.keys(data).forEach(key => {
            const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
            html = html.replace(regex, data[key]);
        });

        // Handle arrays/objects
        Object.keys(data).forEach(key => {
            if (Array.isArray(data[key])) {
                const arrayRegex = new RegExp(`{{#each\\s+${key}}}([\\s\\S]*?){{/each}}`, 'g');
                html = html.replace(arrayRegex, (match, content) => {
                    return data[key].map(item => {
                        let itemHtml = content;
                        Object.keys(item).forEach(itemKey => {
                            const itemRegex = new RegExp(`{{\\s*${itemKey}\\s*}}`, 'g');
                            itemHtml = itemHtml.replace(itemRegex, item[itemKey]);
                        });
                        return itemHtml;
                    }).join('');
                });
            }
        });

        return html;
    }
}

// Global instance
window.ComponentLoader = new ComponentLoader();

