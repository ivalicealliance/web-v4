import { fetchMembers } from './members-api';
import { listTemplate, errorMessage } from './members-templates';

async function init() {
  const container = document.getElementById('memberlist-container');
  if (!container) return;

  const url = container.getAttribute('data-url') || '';
  const availableSprites = JSON.parse(container.getAttribute('data-sprites') || '[]');
  const listElem = document.getElementById('memberlist');
  const skeletonElem = document.getElementById('memberlist-skeleton');

  try {
    const context = await fetchMembers(url);
    if (listElem) {
      listElem.innerHTML = listTemplate(context, availableSprites);
      listElem.style.display = '';
    }
  } catch (error) {
    console.error('Error loading members:', error);
    if (listElem) {
      listElem.innerHTML = errorMessage;
      listElem.style.display = '';
    }
  } finally {
    if (skeletonElem) {
      skeletonElem.remove();
    }
  }
}

// Safely execute the initialization script ensuring DOM readiness inside bundled module execution
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
