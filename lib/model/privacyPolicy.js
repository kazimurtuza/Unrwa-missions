import mongoose from 'mongoose';

const privacyPolicyModel = new mongoose.Schema({
    details_en: {
        type: String,
    },
    detail_ar: {
        type: String,
    },
});
export const PrivacyPolicy=mongoose.models.privacy_policies || mongoose.model("privacy_policies",privacyPolicyModel)