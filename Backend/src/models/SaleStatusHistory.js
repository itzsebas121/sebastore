// SaleStatusHistory model
class SaleStatusHistory {
  constructor({ HistoryId, SaleId, PreviousStatus, NewStatus, ChangeDate }) {
    this.HistoryId = HistoryId;
    this.SaleId = SaleId;
    this.PreviousStatus = PreviousStatus;
    this.NewStatus = NewStatus;
    this.ChangeDate = ChangeDate;
  }
}
module.exports = SaleStatusHistory;
