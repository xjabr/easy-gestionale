const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

// TODO: VALIDATION
const UserSchema = new mongoose.Schema({
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

UserSchema.pre('save', function (next) {
	// Check if document is new or a new password has been set
	if (this.isNew || this.isModified('password')) {
		// Saving reference to this because of changing scopes
		const document = this;
		bcrypt.hash(document.password, saltRounds, function (err, hashedPassword) {
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
		return bcrypt.compare(password, this.password);
	},
}

// Export the model and return your IUser interface
const UserColl = mongoose.model('user', UserSchema);
module.exports = UserColl;