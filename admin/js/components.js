/* ============================================
   COMPONENT MANAGER
   Simplified component system using direct rendering
   ============================================ */

// Component registry
const Components = {};

/**
 * Register a component
 */
function registerComponent(name, component) {
    Components[name] = component;
}

/**
 * Render a component
 */
function renderComponent(name, containerId, data = {}) {
    const component = Components[name];
    if (!component) {
        console.error(`Component ${name} not found`);
        return;
    }

    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    // Render component
    if (component.render) {
        container.innerHTML = component.render(data);
        
        // Initialize if method exists
        if (component.init) {
            component.init(container, data);
        }
    }
}

/**
 * Render component to element
 */
function renderToElement(name, element, data = {}) {
    const component = Components[name];
    if (!component || !element) return;

    if (component.render) {
        element.innerHTML = component.render(data);
        
        if (component.init) {
            component.init(element, data);
        }
    }
}

// Export
window.Components = Components;
window.registerComponent = registerComponent;
window.renderComponent = renderComponent;
window.renderToElement = renderToElement;

