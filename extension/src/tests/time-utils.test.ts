import { get_local_datetime } from "../utils/time_utils";


test('gets local datetime in extended ISO format without time zones', () => {
    const dates = [
        "2023-01-12T18:49:20.132",
        "2023-02-12T18:49:20.132",
        "2023-03-12T18:49:20.132",
        "2023-04-12T18:49:20.132",
        "2023-05-12T18:49:20.132",
        "2023-06-12T18:49:20.132",
        "2023-07-12T18:49:20.132",
        "2023-08-12T18:49:20.132",
        "2023-09-12T18:49:20.132",
        "2023-10-12T18:49:20.132",
        "2023-11-12T18:49:20.132",
        "2023-12-12T18:49:20.132",
    ]
    dates.forEach(date => {
        expect(get_local_datetime(new Date(date))).toBe(date);
    })
});