CREATE SEQUENCE IF NOT EXISTS user_sequence START WITH 1 INCREMENT BY 1;
INSERT INTO users (USER_ID, IDENTITY_NUMBER, TITLE, USER_NAME) VALUES (1, '038384194', 'Admin', 'Eitan Volach');
INSERT INTO users (USER_ID, IDENTITY_NUMBER, TITLE, USER_NAME) VALUES (2, '123456789', 'Supervisor', 'Etti Yosef');
INSERT INTO users (USER_ID, IDENTITY_NUMBER, TITLE, USER_NAME) VALUES (3, '033930504', 'Instructor', 'Limor Aloni');
INSERT INTO users (USER_ID, IDENTITY_NUMBER, TITLE, USER_NAME) VALUES (4, '555555555', 'Instructor', 'Dan Lamdan');
ALTER SEQUENCE user_sequence RESTART WITH 5;

CREATE SEQUENCE IF NOT EXISTS instructor_sequence START WITH 100 INCREMENT BY 1;
INSERT INTO instructors (instructor_Id, user_id, instructor_name, rate_Code) VALUES (100, 3, 'Limor Aloni', 'EXP');
INSERT INTO instructors (instructor_Id, user_id, instructor_name, rate_Code) VALUES (101, 4, 'Dan Lamdan', 'NOV');
ALTER SEQUENCE instructor_sequence RESTART WITH 102;

CREATE SEQUENCE IF NOT EXISTS institute_sequence START WITH 1000 INCREMENT BY 1;
INSERT INTO institutes (institute_Id, institute_name, institute_Type, rate_Code) VALUES (1000, 'Alonim', 'High School', 'REG');
INSERT INTO institutes (institute_Id, institute_name, institute_Type, rate_Code) VALUES (1001, 'Pashosh', 'Kindergarden', 'LOW');
ALTER SEQUENCE institute_sequence RESTART WITH 1002;

INSERT INTO RATES (rate_id, rate_code, rate) VALUES (1, 'LOW', 10);
INSERT INTO RATES (rate_id, rate_code, rate) VALUES (2, 'NOV', 20);
INSERT INTO RATES (rate_id, rate_code, rate) VALUES (3, 'REG', 30);
INSERT INTO RATES (rate_id, rate_code, rate) VALUES (4, 'EXP', 50);
INSERT INTO RATES (rate_id, rate_code, rate) VALUES (5, 'BOS', 100);

CREATE SEQUENCE IF NOT EXISTS monthly_reports_sequence START WITH 10000 INCREMENT BY 1;
INSERT INTO MONTHLY_REPORTS  (REPORT_ID, REPORT_MONTH, INSTITUTE_NAME, INSTITUTE_ID, TOTAL_HOURS, TOTAL_CHARGE) VALUES (10001, '2025-03', 'Alonim', 1000, 100, 5000);
INSERT INTO MONTHLY_REPORTS  (REPORT_ID, REPORT_MONTH, INSTITUTE_NAME, INSTITUTE_ID, TOTAL_HOURS, TOTAL_CHARGE) VALUES (10002, '2025-02', 'Alonim', 1000, 200, 10000);
INSERT INTO MONTHLY_REPORTS  (REPORT_ID, REPORT_MONTH, INSTITUTE_NAME, INSTITUTE_ID, TOTAL_HOURS, TOTAL_CHARGE) VALUES (10003, '2025-03', 'Pashosh', 1001, 300, 6000);
ALTER SEQUENCE monthly_reports_sequence RESTART WITH 10004;
