/* ============================================
   RANK TABLE COMPONENT
   ============================================ */

const RankTableComponent = {
    defaultRanks: [
        { stars: 1, name: '1 Star', requirement: '5gm Deposit + 5 Active', reward: '1.5g', salary: '1.5g', status: 'active' },
        { stars: 2, name: '2 Star', requirement: '10gm + 10 Active', reward: '2g', salary: '2g', status: 'locked' },
        { stars: 3, name: '3 Star', requirement: '20gm + 15 Active', reward: '3g', salary: '3g', status: 'locked' },
        { stars: 4, name: '4 Star', requirement: '30gm + 20 Active', reward: '4g', salary: '4g', status: 'locked' }
    ],

    render(data = {}) {
        const title = data.title || 'Your Rank Journey';
        const ranks = data.ranks || this.defaultRanks;

        return `
            <div class="content-card">
                <div class="card-header">
                    <h3 class="card-title">${title}</h3>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table rank-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Requirement</th>
                                    <th>Reward</th>
                                    <th>Salary</th>
                                    <th>Tag</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${ranks.map(rank => this.renderRankRow(rank)).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    renderRankRow(rank) {
        const statusClass = rank.status === 'active' ? 'rank-active' : 'rank-locked';
        const statusText = rank.status === 'active' ? 'Active' : 'Locked';

        const starsHtml = Array(rank.stars).fill(0).map(() => `
            <i class="fas fa-star"></i>
        `).join('');

        return `
            <tr>
                <td>
                    <div class="rank-stars">
                        ${starsHtml}
                    </div>
                    <span class="rank-name">${rank.name}</span>
                </td>
                <td>${rank.requirement}</td>
                <td>${rank.reward}</td>
                <td>${rank.salary}</td>
                <td>
                    <span class="rank-tag ${statusClass}">${statusText}</span>
                </td>
            </tr>
        `;
    }
};

// Register component
if (window.Components) {
    window.Components.RankTable = RankTableComponent;
}

