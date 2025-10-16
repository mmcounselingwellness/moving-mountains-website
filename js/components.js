/**
 * Component Loader for Moving Mountains Website
 * Loads header, footer, and team members dynamically
 */

// Load HTML component into a container
async function loadComponent(componentName, containerId) {
  try {
    const response = await fetch(`components/${componentName}.html`);
    if (!response.ok) throw new Error(`Failed to load ${componentName}`);
    const html = await response.text();
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = html;
    }
  } catch (error) {
    console.error(`Error loading component ${componentName}:`, error);
  }
}

// Load team members from JSON and render them
async function loadTeamMembers() {
  const container = document.getElementById('team-members-list');
  if (!container) return; // Only run on pages with team members

  try {
    const response = await fetch('data/team-members.json');
    if (!response.ok) throw new Error('Failed to load team members');
    const teamMembers = await response.json();

    // Sort by order
    teamMembers.sort((a, b) => a.order - b.order);

    // Render each team member
    container.innerHTML = teamMembers.map(member => `
      <li class="flex flex-col gap-10 py-12 first:pt-0 last:pb-0 sm:flex-row">
        <img src="${member.image}" alt="${member.name}" class="aspect-4/5 w-52 flex-none rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5" />
        <div class="max-w-xl flex-auto">
          <h3 class="text-lg/8 font-semibold tracking-tight text-gray-900">${member.name}</h3>
          <p class="text-base/7 text-gray-600">${member.title}</p>
          <p class="mt-6 text-base/7 text-gray-600">${member.bio}</p>
          <a href="${member.bioPage}" class="text-sm/6 font-semibold text-heading hidden md:flex">Learn more <span aria-hidden="true">&rarr;</span></a>
        </div>
      </li>
    `).join('');
  } catch (error) {
    console.error('Error loading team members:', error);
    container.innerHTML = '<li class="py-12"><p class="text-gray-600">Unable to load team members. Please try again later.</p></li>';
  }
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  // Load header and footer
  await loadComponent('header', 'header-component');
  await loadComponent('footer', 'footer-component');

  // Load team members if on team page
  await loadTeamMembers();
});
