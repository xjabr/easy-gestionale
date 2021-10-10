import * as express from 'express';
import * as jwt from 'jsonwebtoken';

const { assertExposable, throwExposable } = require('../modules/errors');
import { JWT_SECRETS } from '../configuration';
import UserColl from '../models/user';
import OrganizationColl from '../models/organization';
import { ResponseExpress } from '../interfaces';

export const authMiddleware = {
  authAssert: (opts = {} as any) => async (
    req: express.Request,
    res: ResponseExpress,
    next: express.NextFunction,
  ) => {
    const bearerHeader = req.headers['authorization'] as string;

    assertExposable(bearerHeader, 'token_not_found');

    const bearer = bearerHeader.split(' ')[1];
    assertExposable(!!bearer, 'token_not_found');
    try {
      await jwt.verify(bearer, JWT_SECRETS);
    } catch (e) {
			throwExposable('access_denied');
    }

    const { organization_id, email } = jwt.decode(bearer) as any;

    const user = await UserColl.findOne({ email });
    assertExposable(user, 'access_denied');
		
		if (opts.isVerified) {
			assertExposable((opts.isVerified && user.isVerified), 'user_not_verified');
		}
		
		if (opts.isActive) {
			assertExposable((opts.isActive && user.isActive), 'disabled_account');
		}

		if (opts.isAdmin) {
			assertExposable((opts.isAdmin && user.isAdmin), 'user_not_admin');
		}

		const organization = await OrganizationColl.findById({ _id: organization_id });
    assertExposable(organization, 'organization_not_found');

		res.user = user;
		res.id = user.id;
		res.role = user.role;
		res.organization_id = user.organization_id;
		res.isAdmin = user.isAdmin;

    next();
  }
};