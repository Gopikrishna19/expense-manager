import * as t from 'tcomb-validation';

export const entryFields = {
    amount: 'amount',
    category: 'category',
    reason: 'reason',
    type: 'type'
};

export const entryType = {
    credit: 'credit',
    debit: 'debit'
};

export const entryCategoryType = {
    creditCard: 'creditCard',
    family: 'family',
    homeImprovement: 'homeImprovement',
    income: 'income',
    loan: 'loan',
    medical: 'medical',
    miscellaneous: 'miscellaneous',
    rent: 'rent',
    travel: 'travel'
};

export const entryCategories = {
    [entryCategoryType.income]: 'Income',
    [entryCategoryType.rent]: 'Rent',
    [entryCategoryType.creditCard]: 'Credit Card',
    [entryCategoryType.medical]: 'Medical',
    [entryCategoryType.loan]: 'Loan',
    [entryCategoryType.family]: 'Family Expenses',
    [entryCategoryType.travel]: 'Travel',
    [entryCategoryType.homeImprovement]: 'Home Improvement',
    [entryCategoryType.miscellaneous]: 'Miscellaneous'
};

const EntryType = t.enums(entryType, 'EntryType');
const NonZeroNumber = t.refinement(t.Number, value => value > 0, 'NonZeroNumber');
const NonEmptyString = t.refinement(t.String, value => value.trim() !== '', 'NonEmptyString');

const Entry = t.struct({
    [entryFields.amount]: t.Number,
    [entryFields.category]: t.String,
    [entryFields.reason]: t.String,
    [entryFields.type]: EntryType
}, 'Entry');

Entry.prototype.updateField = function (field, value) {
    return Entry.update(this, {[field]: {$set: value}});
};
Entry.prototype.getValidations = function () {
    const validations = {
        [entryFields.amount]: t.validate(this.amount, NonZeroNumber).isValid(),
        [entryFields.category]: t.validate(this.category, NonEmptyString).isValid(),
        [entryFields.reason]: t.validate(this.reason, NonEmptyString).isValid(),
        [entryFields.type]: t.validate(this.type, EntryType).isValid()
    };
    const all = Object.values(validations).every(valid => valid);

    return Object.assign(validations, {all});
};

export const getDefaultEntry = () => new Entry({
    [entryFields.amount]: 0,
    [entryFields.category]: '',
    [entryFields.reason]: '',
    [entryFields.type]: 'debit'
});
