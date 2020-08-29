import moment from 'moment';

export const prepareEvents = (events) => {
  return events.map((item) => ({
    ...item,
    start: moment(item.start).toDate(),
    end: moment(item.end).toDate(),
  }));
};
