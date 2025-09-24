export const statuses = ['up', 'partial', 'down'] as const;
export type ServiceStatus = (typeof statuses)[number];
