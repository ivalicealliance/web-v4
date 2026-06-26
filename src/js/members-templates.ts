import { generateAvatarSvg } from '../utils/avatar';
import type { Member, Role, MembersContext } from './members-api';

const spritePath = '/assets/sprites/ffrk/';
const statuses = ['online', 'idle', 'dnd', 'offline'];
const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
};

const construct8Link = '<a href="https://github.com/ivalicealliance/construct8/" class="link-secondary" target="_blank" rel="noopener noreferrer">Construct8</a>';

export const errorMessage = `
    <i class="fa-solid fa-triangle-exclamation"></i> Unfortunately ${construct8Link} is unreachable at the moment. Please try again later. If this issue persists,
    bring it to the attention of the community's leadership.
`;

function statusTemplate(context: Member): string {
  if (context.presence && statuses.includes(context.presence.status)) {
    return `<i class="fa-solid fa-user ${context.presence.status}" data-fa-transform="shrink-5"></i>`;
  }
  return ``;
}

function animationTemplate(context: Member): string {
  if (context.presence && statuses.includes(context.presence.status)) {
    return `sprite-${context.presence.status}`;
  }
  return ``;
}

function memberTemplate(context: Member, availableSprites: string[]): string {
  const nameKey = context.name.toLowerCase();
  const hasSprite = availableSprites.includes(nameKey);
  const animationClass = animationTemplate(context);

  let avatarHtml;
  if (hasSprite) {
    avatarHtml = `<img src="${spritePath}${nameKey}.png" alt="Avatar of ${context.name}" class="${animationClass} pixelated rounded-5">`;
  } else {
    avatarHtml = generateAvatarSvg(context.name, animationClass);
  }

  return `
  <div class="col">
      <div class="card rounded-5 shadow-sm position-relative overflow-hidden">
          <div class="card-img-top p-3 pb-0 mx-auto">
              <div class="ratio ratio-1x1">
                  ${avatarHtml}
              </div>
          </div>
          <div class="card-body text-center">
              <h6 class="card-title fw-light">${statusTemplate(context)} ${context.name}</h6>
          </div>
      </div>
  </div>
  `;
}

/**
 * Builds the HTML layout string representing all roles and member cards.
 */
export function listTemplate(list: MembersContext, availableSprites: string[]): string {
  return `
    ${list.roles
      .map(
        (role: Role) => `
          <h5 class="fw-light">${role.name}</h5>
          <div class="mb-4">
              <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
                  ${list.members
                    .filter((member: Member) => member.position === role.position)
                    .map((member: Member) => memberTemplate(member, availableSprites))
                    .join('')}
              </div>
          </div>
        `
      )
      .join('')}
      <div class="text-center">
          <div class="d-inline-flex">
              <ul class="text-body-tertiary list-inline m-0">
                  <li class="list-inline-item">
                      <i class="fa-solid fa-users"></i>
                      ${list.meta.membercount} members
                  </li>
                  <li class="list-inline-item">
                      <i class="fa-solid fa-sitemap"></i>
                      ${list.meta.rolecount} roles
                  </li>
                  <li class="list-inline-item">
                      <i class="fa-solid fa-robot"></i>
                      ${construct8Link}
                  </li>
                  <li class="list-inline-item">
                      <i class="fa-solid fa-clock"></i>
                      ${new Date(list.meta.lastModified).toLocaleTimeString('en-US', dateOptions)}
                  </li>
              </ul>
          </div>
      </div>
  `;
}
