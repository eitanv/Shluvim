CREATE SEQUENCE IF NOT EXISTS user_sequence START WITH 1 INCREMENT BY 1;

INSERT INTO users (USER_ID, IDENTITY_NUMBER, TITLE, USER_NAME) VALUES (1, '038384194', 'Admin', 'Eitan Volach');
INSERT INTO users (USER_ID, IDENTITY_NUMBER, TITLE, USER_NAME) VALUES (2, '123456789', 'Supervisor', 'Etti Yosef');
INSERT INTO users (USER_ID, IDENTITY_NUMBER, TITLE, USER_NAME) VALUES (3, '033930504', 'Instructor', 'Limor Aloni');
INSERT INTO users (USER_ID, IDENTITY_NUMBER, TITLE, USER_NAME) VALUES (4, '555555555', 'Instructor', 'Dan Lamdan');
ALTER SEQUENCE user_sequence RESTART WITH 5;

CREATE SEQUENCE IF NOT EXISTS instructor_sequence START WITH 1 INCREMENT BY 1;
INSERT INTO instructors (instructor_Id, user_id, instructor_name, rate_Code) VALUES (100, 3, 'Limor Aloni', 'EXP');
INSERT INTO instructors (instructor_Id, user_id, instructor_name, rate_Code) VALUES (101, 4, 'Dan Lamdan', 'NOV');
ALTER SEQUENCE instructor_sequence RESTART WITH 102;

INSERT INTO institutes (institute_Id, institute_name, institute_Type, rate, rate_Code) VALUES (1000, 'Alonim', 'High School', 45, 'REG');
INSERT INTO institutes (institute_Id, institute_name, institute_Type, rate, rate_Code) VALUES (1001, 'Pashosh', 'Kindergarden', 15, 'LOW');

INSERT INTO RATES (rate_id, rate_code, rate) VALUES (1, 'NOV', 20);
INSERT INTO RATES (rate_id, rate_code, rate) VALUES (2, 'EXP', 30);
INSERT INTO RATES (rate_id, rate_code, rate) VALUES (3, 'BOS', 50);

CREATE SEQUENCE IF NOT EXISTS monthly_reports_sequence START WITH 1 INCREMENT BY 1;
INSERT INTO MONTHLY_REPORTS  (REPORT_ID, REPORT_MONTH, INSTITUTE_NAME, INSTITUTE_ID, TOTAL_HOURS, TOTAL_CHARGE) VALUES (10001, '2025-03', 'Alonim', 1000, 100, 5000);
INSERT INTO MONTHLY_REPORTS  (REPORT_ID, REPORT_MONTH, INSTITUTE_NAME, INSTITUTE_ID, TOTAL_HOURS, TOTAL_CHARGE) VALUES (10002, '2025-02', 'Alonim', 1000, 200, 10000);
INSERT INTO MONTHLY_REPORTS  (REPORT_ID, REPORT_MONTH, INSTITUTE_NAME, INSTITUTE_ID, TOTAL_HOURS, TOTAL_CHARGE) VALUES (10003, '2025-03', 'Pashosh', 1001, 300, 6000);
ALTER SEQUENCE monthly_reports_sequence RESTART WITH 10004;
