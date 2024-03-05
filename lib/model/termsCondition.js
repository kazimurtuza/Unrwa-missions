import mongoose from 'mongoose';

const termsConditionModel = new mongoose.Schema({
    detail_en: {
        type: String,
    },
    detail_ar: {
        type: String,
    },
});
export const TermsCondition=mongoose.models.terms_conditions || mongoose.model("terms_conditions",termsConditionModel)