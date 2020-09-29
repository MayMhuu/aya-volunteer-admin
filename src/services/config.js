import moment from 'moment';
let config = {
    host: 'https://ayavapp.herokuapp.com',
    defaultAvatar: "https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png",
    Urls3: "https://dev-ayaloyalty-storage.s3-ap-southeast-1.amazonaws.com/",
    S3Location: "https://ayaplus-backend-dev.s3.amazonaws.com/",
    debug: true,
    REGEX_USER: '[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9]){5,40}$',
    REGEX_PASSWORD: '[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9]){8,40}$',
    DEFAULT_TOKEN: { 'Authorization': `Bearer xxnBpuxNrRKs6H6Wq3J7KzYDkPFAyzW9` },
    DATE_RANGE_OPTIONS: [{label: 'Today', value: [moment(), moment().endOf('day')]},{label: 'This Month', value: [moment().startOf('month'), moment().endOf('month')]},{label: 'Last Month', value: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]},{label: 'This Year', value: [moment().startOf('year'), moment().endOf('year')]},{label: 'Last Year', value: [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]}]
}
export default config;


