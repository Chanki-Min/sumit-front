import Slide from './Slide';

export interface Page {
	uuid: number;

	user_uuid: string;

	title: string;

	description: string;

	hashtags: string[];

	share: boolean;

	createAt: number; // unix timestamp

	updateAt: number; // unix timestamp

	slides: Slide[];
}

export type OmittedPage = Omit<
	Page,
	'user_uuid' | 'createAt' | 'updateAt' | 'slides'
>;

export type PagePartial = Partial<Page>;
