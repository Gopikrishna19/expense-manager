import * as t from 'tcomb-validation';

export const entryFields = {
    amount: 'amount',
    category: 'category',
    date: 'date',
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

const TEntryType = t.enums(entryType, 'TEntryType');
const TNonZeroNumber = t.refinement(t.Number, value => value > 0, 'TNonZeroNumber');
const TNonEmptyString = t.refinement(t.String, value => value.trim() !== '', 'TNonEmptyString');

export const TEntry = t.struct({
    [entryFields.amount]: t.Number,
    [entryFields.category]: t.String,
    [entryFields.date]: t.maybe(t.Number),
    [entryFields.reason]: t.String,
    [entryFields.type]: TEntryType
}, 'TEntry');

TEntry.prototype.updateField = function (field, value) {
    return TEntry.update(this, {[field]: {$set: value}});
};
TEntry.prototype.getValidations = function () {
    const validations = {
        [entryFields.amount]: t.validate(this.amount, TNonZeroNumber).isValid(),
        [entryFields.category]: t.validate(this.category, TNonEmptyString).isValid(),
        [entryFields.reason]: t.validate(this.reason, TNonEmptyString).isValid(),
        [entryFields.type]: t.validate(this.type, TEntryType).isValid()
    };
    const all = Object.values(validations).every(valid => valid);

    return Object.assign(validations, {all});
};

export const getDefaultEntry = () => new TEntry({
    [entryFields.amount]: 0,
    [entryFields.category]: '',
    [entryFields.reason]: '',
    [entryFields.type]: 'debit'
});
