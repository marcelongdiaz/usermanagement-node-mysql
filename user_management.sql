CREATE DATABASE user_management;
USE user_management;

CREATE TABLE users (
  id integer(11) PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  address VARCHAR(100) NOT NULL,
  post_code VARCHAR(100) NOT NULL,
  contact_phone VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (first_name, last_name, address, post_code, contact_phone, email, username, password, role, date_created)
VALUES 
('Admin', 'John', '6490 Old Shore Park', '76452-001', '726-795-9993', 'adminjohn@test.com', 'admin', '123', 'admin', '2023-01-19 10:44:58'),
('Georgette', 'Kobisch', '5 Bowman Way', '51346-174', '421-996-4418', 'gkobisch1@cornell.edu', 'gkobisch1', 'VtSQSSTRcVf', 'Electrician', '2022-10-21 18:31:47'),
('Adlai', 'Rodger', '97995 Jenifer Circle', '52125-437', '995-463-4277', 'arodger2@discovery.com', 'arodger2', 'JsygkebmdT', 'Construction Worker', '2022-12-02 15:34:24'),
('Kaylee', 'Bazelle', '7 Dakota Road', '54473-180', '226-357-9094', 'kbazelle3@stanford.edu', 'kbazelle3', 'tYZNia1xg1', 'Surveyor', '2022-12-12 02:33:18'),
('Suzann', 'Gedling', '3 Thierer Drive', '66479-582', '924-858-5722', 'sgedling4@cnet.com', 'sgedling4', 'm7iBHf4I', 'Construction Worker', '2023-01-31 15:54:48'),
('Lilla', 'Uwins', '4837 Bobwhite Terrace', '50242-063', '855-439-7864', 'luwins5@discuz.net', 'luwins5', 'c5QVOjRpAQ', 'Project Manager', '2022-05-26 23:57:08'),
('Zarla', 'Cavee', '51128 Green Ridge Pass', '42192-109', '925-155-4553', 'zcavee6@npr.org', 'zcavee6', 'S8SaLw', 'Architect', '2023-03-08 23:50:53'),
('Ortensia', 'Bearne', '666 Mallory Point', '49288-0371', '669-651-5035', 'obearne7@icio.us', 'obearne7', 'ZItTfCa7nVO9', 'Construction Foreman', '2022-04-23 07:29:51'),
('Ganny', 'Guirau', '0 Elka Place', '52125-802', '379-608-0490', 'gguirau8@blogspot.com', 'gguirau8', 'rtAkBsxIVCR8', 'Construction Worker', '2023-03-09 07:52:52'),
('Lucky', 'Rockwill', '03 Merchant Lane', '10370-101', '842-833-6246', 'lrockwill9@lulu.com', 'lrockwill9', 'N7XjFu2o', 'Construction Manager', '2022-09-06 15:09:14'),
('Avery', 'Pooly', '6731 Browning Lane', '63824-348', '189-263-4264', 'apoolya@statcounter.com', 'apoolya', 'nKj1yMDft4mi', 'Architect', '2022-09-24 08:35:25'),
('Hewitt', 'Thom', '6 Waywood Trail', '63824-750', '586-114-0991', 'hthomb@soup.io', 'hthomb', 'wLEcdvoFgNPp', 'Supervisor', '2022-05-18 14:06:16'),
('Ermanno', 'Gooding', '63 Lerdahl Trail', '62874-005', '571-554-7974', 'egoodingc@arstechnica.com', 'egoodingc', 'EZ2zPHsKUZ', 'Construction Manager', '2022-08-18 07:25:20'),
('Marena', 'De Cristofalo', '36140 Portage Circle', '42627-259', '710-523-5522', 'mdecristofalod@imageshack.us', 'mdecristofalod', 'LXlDSAODy8E', 'Project Manager', '2023-01-13 12:12:39'),
('Ramonda', 'Koeppe', '599 Springs Center', '63187-030', '892-139-4982', 'rkoeppee@craigslist.org', 'rkoeppee', 'xKRJPPrC', 'Electrician', '2022-05-28 16:58:55'),
('Angelina', 'Krollman', '5450 Dixon Junction', '51772-314', '243-269-5409', 'akrollmanf@prnewswire.com', 'akrollmanf', '066FBpgKj', 'Subcontractor', '2022-12-28 15:01:09'),
('Alyson', 'Durnell', '6 Mayfield Junction', '0378-3567', '234-170-5620', 'adurnellg@mail.ru', 'adurnellg', 'nKRgbv1m', 'Construction Foreman', '2022-06-15 06:04:57'),
('Kristofer', 'Donet', '4 Red Cloud Road', '59779-806', '422-921-8271', 'kdoneth@miitbeian.gov.cn', 'kdoneth', 'LzXS36OAtZm', 'Construction Manager', '2022-05-29 10:05:57'),
('Trumann', 'Skylett', '8798 Shasta Circle', '59627-002', '635-617-2982', 'tskyletti@mail.ru', 'tskyletti', 'AFPoaJ9i8u', 'Surveyor', '2022-03-02 02:52:42'),
('Nicolai', 'Eiler', '97 Dottie Way', '63736-851', '989-611-4410', 'neilerj@princeton.edu', 'neilerj', 'jFf6DYIMtUC9', 'Construction Manager', '2022-04-30 04:55:06');