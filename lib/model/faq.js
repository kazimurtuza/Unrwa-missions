import mongoose from 'mongoose';

const faqModel = new mongoose.Schema({
    title_en: {
        type: String,
    },
    details_en: {
        type: String,
    },
    title_ar: {
        type: String,
    },
    detail_ar: {
        type: String,
    },
});

export const Faq=mongoose.models.faqs || mongoose.model("faqs",faqModel)