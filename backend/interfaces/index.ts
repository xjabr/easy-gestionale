import * as express from 'express';

export interface ResponseExpress extends express.Response {
	id: string;
	user: any;
	role: string;
	organization_id: string;
	isAdmin: boolean;
	error: any;
}