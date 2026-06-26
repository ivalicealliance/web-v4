export interface MemberPresence {
  status: string;
}

export interface Member {
  name: string;
  position: number;
  avatar?: string;
  presence?: MemberPresence;
}

export interface Role {
  name: string;
  position: number;
}

export interface MembersMeta {
  membercount: number;
  rolecount: number;
  lastModified: number;
}

export interface MembersContext {
  meta: MembersMeta;
  members: Member[];
  roles: Role[];
}

/**
 * Fetches the members list payload from the specified endpoint.
 * In development mode, appends mock test characters.
 */
export async function fetchMembers(url: string): Promise<MembersContext> {
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Failed to fetch members: ${resp.statusText}`);
  }
  const context: MembersContext = await resp.json();
  return context;
}
