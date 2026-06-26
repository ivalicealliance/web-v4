const BOOTSTRAP_COLOR_TOKENS = [
  '--bs-blue',
  '--bs-indigo',
  '--bs-purple',
  '--bs-pink',
  '--bs-red',
  '--bs-green'
];

/**
 * Extracts initials from a member's name.
 * - For multi-word names, takes the first letter of the first and last word (e.g. "Ramza Beoulve" -> "Rb").
 * - For camelCase/PascalCase single words, extracts the first two capital letters (e.g. "RedMage" -> "Rm").
 * - For other single words, takes the first two characters (e.g. "Balthier" -> "Ba").
 * - Forces the second letter to always be lowercase.
 */
export function getInitials(name: string): string {
  if (!name) return '??';
  const cleanName = name.trim();
  const parts = cleanName.split(/[\s\-_]+/);
  let text = '';
  if (parts.length >= 2) {
    text = parts[0][0] + parts[parts.length - 1][0];
  } else {
    const upperLetters = cleanName.replace(/[^A-Z]/g, '');
    if (upperLetters.length >= 2 && upperLetters.length <= 4) {
      text = upperLetters.slice(0, 2);
    } else if (cleanName.length >= 2) {
      text = cleanName.slice(0, 2);
    } else {
      text = cleanName;
    }
  }
  if (text.length >= 2) {
    return text[0].toUpperCase() + text[1].toLowerCase();
  }
  return text.toUpperCase();
}

/**
 * Generates an inline vector SVG element for the avatar placeholder.
 * It selects a background color from the Bootstrap color tokens dynamically based on the name hash.
 */
export function generateAvatarSvg(name: string, animationClass = '', fontSize = 140): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % BOOTSTRAP_COLOR_TOKENS.length;
  const tokenName = BOOTSTRAP_COLOR_TOKENS[colorIndex];
  const initials = getInitials(name);

  // Scaled font size if initials length exceeds 2
  let scaledFontSize = fontSize;
  if (initials.length > 2) {
    scaledFontSize = scaledFontSize - (initials.length - 2) * 20;
  }

  return `
    <svg class="${animationClass} rounded-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%">
      <rect width="256" height="256" fill="var(${tokenName})" />
      <text x="50%" y="50%" text-anchor="middle" fill="#FFFFFF" font-family="'Prompt', 'Raleway', system-ui, -apple-system, sans-serif" font-weight="600" font-size="${scaledFontSize}px" dy="0.35em">${initials}</text>
    </svg>
  `;
}
