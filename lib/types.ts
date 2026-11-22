export type Folder = {
  id: string;
  name: string;
  count: number;
};

export type LinkItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  folderId: string;
  createdAt: string;
};
