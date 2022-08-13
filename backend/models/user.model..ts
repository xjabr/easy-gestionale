import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export interface IUser extends mongoose.Document {
  organization_id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
	password: string;
	role: string;
	isAdmin: boolean;
	isActive: boolean;
	isVerified: boolean;
	divisions: Array<any>;
  isCorrectPassword?(password: string): void;
}

// TODO: VALIDATION
const UserSchema: mongoose.Schema = new mongoose.Schema({
	organization_id: { type: mongoose.Types.ObjectId, ref: 'organization' },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	username: { type: String, required: true },
	email: {
		type: String,
		lowercase: true,
		required: [true, 'User email required'],
	},
	password: { type: String, required: true, select: true },
	role: { type: String, required: true, enum: ['ADMIN', 'STAFF', 'CLIENT'] },
	isAdmin: { type: Boolean, default: false },
	isActive: { type: Boolean, default: true },
	isVerified: { type: Boolean, default: false },
	divisions: { type: Array, required: false, default: ['all'] }
});

UserSchema.pre<IUser>('save', function (next) {
	// Check if document is new or a new password has been set
	if (this.isNew || this.isModified('password')) {
		// Saving reference to this because of changing scopes
		const document = this;
		bcrypt.hash(document.password as string, saltRounds, function (err, hashedPassword) {
			if (err) {
				next(err);
			} else {
				document.password = hashedPassword;
				next();
			}
		});
	} else {
		next();
	}
});

UserSchema.methods = {
	isCorrectPassword: async function (password) {
		// @ts-ignore
		return bcrypt.compare(password, this.password);
	}
}

// Export the model and return your IUser interface
const UserColl = mongoose.model<IUser>('users', UserSchema) as any;
export default UserColl;