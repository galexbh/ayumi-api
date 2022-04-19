CREATE DATABASE ayumidb;
/*USE ayumidb;*/

CREATE TABLE Modules(
	ModuleID INT IDENTITY(1,1) PRIMARY KEY,
	NameModules VARCHAR(50) NOT NULL
);

CREATE TABLE Operations(
	OperationID INT IDENTITY(1,1) PRIMARY KEY,
	NameOperations VARCHAR(50) NOT NULL,
	fk_Module INT,

	FOREIGN KEY (fk_Module) REFERENCES Modules(ModuleID)
);

CREATE TABLE Roles(
	RolID INT IDENTITY(1,1) PRIMARY KEY,
	NameRoles VARCHAR(50) NOT NULL
);

CREATE TABLE RolesOperations(
	RolOperationid INT IDENTITY(1,1) PRIMARY KEY,
	fk_Rol INT,
	fk_Operation INT,

	FOREIGN KEY (fk_Rol) REFERENCES Roles(RolID),
	FOREIGN KEY (fk_Operation) REFERENCES Operations(OperationID)
);

CREATE TABLE Emails(
	EmailID INT IDENTITY(1,1) PRIMARY KEY,
	Email VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE PhoneNumbers(
  PhoneNumberID INT IDENTITY(1,1) PRIMARY KEY,
  PhoneNumber VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Users(
	UserID INT IDENTITY(1,1) PRIMARY KEY,
	fk_rol INT,
	fk_phoneNumber INT,
	fk_email INT,
	FirsName VARCHAR(40) NOT NULL,
	MiddleName VARCHAR(40),
	LastNamePaternal VARCHAR(40) NOT NULL,
	LastNameMaternal VARCHAR(40) NOT NULL,
	Age TINYINT,
	CHECK (Age >=18),
	Sex VARCHAR(20) NOT NULL,
	RTN CHAR(14) UNIQUE NOT NULL,
	PasswordUser VARCHAR(255) NOT NULL,
	DateBirth DATE NOT NULL,
	DateCreated DATE NOT NULL,

	FOREIGN KEY (fk_rol) REFERENCES Roles(RolID),
	FOREIGN KEY (fk_phoneNumber) REFERENCES PhoneNumbers(PhoneNumberID),
	FOREIGN KEY (fk_email) REFERENCES Emails(EmailID)
);

/*_______________________________________________________________________*/

CREATE TABLE WineryAddress(
	WineryAddressID INT IDENTITY(1,1) PRIMARY KEY,
	Colony VARCHAR(40) NOT NULL,
	HouseNumber VARCHAR(10) NOT NULL,
	Street VARCHAR(40) NOT NULL,
	ZipCode SMALLINT NOT NULL,
	Municipality VARCHAR(40) NOT NULL,
	Department VARCHAR(40) NOT NULL

);

CREATE TABLE BranchMailings(
	BranchMailingID INT IDENTITY(1,1) PRIMARY KEY,
	Email VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE BranchOfficeAddress(
	BranchOfficeAddressesID INT IDENTITY(1,1) PRIMARY KEY,
	Colony VARCHAR(40) NOT NULL,
	Street VARCHAR(40) NOT NULL,
	LengthBOA VARCHAR(40) NOT NULL,
	LatitudeBOA VARCHAR(40) NOT NULL,
	ZipCode SMALLINT NOT NULL,
	Municipality VARCHAR(40) NOT NULL,
	Department VARCHAR(40) NOT NULL
);

CREATE TABLE CAIs(
	CAIID INT IDENTITY(1,1) PRIMARY KEY,
	CAINumber VARCHAR(50),
	InitialRange VARCHAR(25),
	FinalRange VARCHAR(25),
	ExpirationDate DATE,
	AuthorizedRange INT,
	EnabledCAI BIT
);

CREATE TABLE BranchOffices(
	BranchOfficeID INT IDENTITY(1,1) PRIMARY KEY,
	fk_BranchMailing INT,
	fk_BranchOfficeAddress INT,
	fk_CAI INT,
	IssueNumber INT NOT NULL,
	TelephoneContact INT NOT NULL,
	BranchName VARCHAR(50) NOT NULL,

	FOREIGN KEY (fk_BranchMailing) REFERENCES BranchMailings(BranchMailingID),
	FOREIGN KEY (fk_BranchOfficeAddress) REFERENCES BranchOfficeAddress(BranchOfficeAddressesID),
	FOREIGN KEY (fk_CAI) REFERENCES CAIs(CAIID)
);


CREATE TABLE Wineries(
	WineryID INT IDENTITY(1,1) PRIMARY KEY,
	fk_BranchOffice INT,
	fk_WineryAddress INT,
	NameWinery VARCHAR(40) NOT NULL,

	FOREIGN KEY (fk_BranchOffice) REFERENCES BranchOffices(BranchOfficeID),
	FOREIGN KEY (fk_WineryAddress) REFERENCES WineryAddress(WineryAddressID)
);

CREATE TABLE Vehicles(
	VehiclesID INT IDENTITY(1,1) PRIMARY KEY,
	fk_Winery INT,
	Brand VARCHAR(30) NOT NULL,
	Model VARCHAR(30),
	YearV DATE,
	IsInsured BIT DEFAULT 0,

	FOREIGN KEY (fk_Winery) REFERENCES WineryAddress(WineryAddressID)
);

CREATE TABLE Drivers(
	DriverID INT IDENTITY(1,1) PRIMARY KEY,
	fk_Employeed INT,
	fk_Vehicle INT,
	isAvailable BIT DEFAULT 0, 

	FOREIGN KEY (fk_Vehicle) REFERENCES Vehicles(VehiclesID),
	FOREIGN KEY (fk_Employeed) REFERENCES  Users( UserID)
);

CREATE TABLE Travels(
	TravelID INT IDENTITY(1,1) PRIMARY KEY,
	fk_userDriver INT,
	fk_userPassenger INT,
	InitialLatitude DECIMAL(7,5) NOT NULL,
	EndLatitude DECIMAL(7,5) NOT NULL,
	InitialDate DATE,
	EndDate DATE,
	InitialAddress VARCHAR(50),
	SuggestedAddress VARCHAR(50),
	EndAddress VARCHAR(50),
	StateTravel BIT,

	FOREIGN KEY (fk_userDriver) REFERENCES Drivers(DriverID),
	FOREIGN KEY (fk_userPassenger) REFERENCES Users(UserID)
);

CREATE TABLE UserOnHold(
	userOnHoldID INT IDENTITY(1,1) PRIMARY KEY,
	fk_travelID INT,
	
	FOREIGN KEY (fk_travelID) REFERENCES Travels(TravelID)
);

/*_______________________________________________________________________*/

CREATE TABLE PaymentInvoice(
	PaymentMadeID INT IDENTITY(1,1) PRIMARY KEY,
	PaymentAmount DECIMAL(10,2) NOT NULL,
	DatePayment DATETIME
);

CREATE TABLE PaymentMethods(
	PaymentMethodID INT IDENTITY(1,1) PRIMARY KEY,
	TypeMethod VARCHAR(30) NOT NULL,
	DescriptionMethod TEXT
);



CREATE TABLE TypeDocuments(
	TypeDocumentID INT IDENTITY(1,1) PRIMARY KEY,
	NameTypeDocuments VARCHAR(50) NOT NULL,
	Code VARCHAR(30)
);

CREATE TABLE InvoicesNumbers(
	InvoiceNumberID INT IDENTITY(1,1) PRIMARY KEY,
	fk_BranchNumber INT,
	fk_TypeDocument INT,
	PointEmission VARCHAR(40) NOT NULL,
	Correlative VARCHAR(10),

	FOREIGN KEY (fk_BranchNumber) REFERENCES BranchOffices(BranchOfficeID),
	FOREIGN KEY (fk_TypeDocument) REFERENCES  TypeDocuments( TypeDocumentID)
);

CREATE TABLE Printers(
	PrinterID INT IDENTITY(1,1) PRIMARY KEY,
	NamePrinter VARCHAR(40) NOT NULL,
	RTN CHAR(14) NOT NULL,
	HeadOfPrinter VARCHAR(50) NOT NULL,
	TelephoneContact VARCHAR(12) NOT NULL,
	CertificatePrinter TEXT 
);

CREATE TABLE Invoices(
	invoiceID INT IDENTITY(1,1) PRIMARY KEY,
	fk_Printer INT,
	fk_BranchOffice INT,
	NameInvoices VARCHAR(40) NOT NULL,
	RTN CHAR(14) NOT NULL,

	FOREIGN KEY (fk_Printer) REFERENCES Printers(PrinterID),
	FOREIGN KEY (fk_BranchOffice) REFERENCES BranchOffices(BranchOfficeID)
);


CREATE TABLE InvoicesDetail(
	InvoiceDetailID INT IDENTITY(1,1) PRIMARY KEY,
	fk_Invoice INT,
	fk_Travel INT,
	fk_InvoiceNumber INT, 
	DateInvoicesDetail DATE,
	Amount DECIMAL(10,2) NOT NULL,
	DescriptionInvoicesDetail TEXT,
	PriceExcempt DECIMAL(10,2) NOT NULL,
	Discount DECIMAL(8,2) NOT NULL,
	PriceGravated15 DECIMAL(8,2) NOT NULL,
	PriceGravated18 DECIMAL(8,2) NOT NULL,
	ISV15 DECIMAL(10,2) NOT NULL,
	ISV18 DECIMAL(10,2) NOT NULL,
	Total DECIMAL(10,2) NOT NULL,
	TotalLetters DECIMAL(10,2) NOT NULL,
	
	FOREIGN KEY (fk_Invoice) REFERENCES Invoices(invoiceID),
	FOREIGN KEY (fk_Travel) REFERENCES Travels(TravelID),
	FOREIGN KEY (fk_InvoiceNumber) REFERENCES InvoicesNumbers(InvoiceNumberID)
);

CREATE TABLE InvoicePaymentMethod(
	Payment_InvoiceID INT IDENTITY(1,1) PRIMARY KEY,
	fk_InvoiceDetail INT,
	fk_PaymentMethod INT,
	fk_PaymentMade INT,

	FOREIGN KEY (fk_PaymentMade) REFERENCES PaymentInvoice(PaymentMadeID),
	FOREIGN KEY (fk_PaymentMethod ) REFERENCES PaymentMethods(PaymentMethodID),
	FOREIGN KEY (fk_InvoiceDetail) REFERENCES InvoicesDetail(InvoiceDetailID)
);

/*_______________________________________________________________________*/


CREATE TABLE CompanyPositions(
	CompanyPositionID INT IDENTITY(1,1) PRIMARY KEY,
	Charge VARCHAR(50) NOT NULL
);

CREATE TABLE TypesContracts(
	TypesContractID INT IDENTITY(1,1) PRIMARY KEY,
	TypeContract VARCHAR(50) NOT NULL
);

CREATE TABLE Contracts(
	ContractID INT IDENTITY(1,1) PRIMARY KEY,
	fk_CompanyPosition INT,
	fk_TypesContract INT,
	ContractReference TEXT,
	StartDate DATE,
	EndDate DATE,
	WorkingDay SMALLINT NOT NULL,
	Salary DECIMAL(10,2) NOT NULL,

	FOREIGN KEY (fk_CompanyPosition) REFERENCES CompanyPositions(CompanyPositionID),
	FOREIGN KEY (fk_TypesContract) REFERENCES TypesContracts(TypesContractID)
);

CREATE TABLE Memorandums(
	MemorandumID INT IDENTITY(1,1) PRIMARY KEY,
	NameMemorandums VARCHAR(40) NOT NULL,
	DateCreation DATE
);


CREATE TABLE Absences(
	AbsenceID INT IDENTITY(1,1) PRIMARY KEY,
	TypeAbsence VARCHAR(40) NOT NULL
);

CREATE TABLE EmployeeAddresses(
	EmployeeAddressID INT IDENTITY(1,1) PRIMARY KEY,
	Colony VARCHAR(40),
	Street VARCHAR(40),
	HouseNumber SMALLINT,
	ZipCode SMALLINT,
	Municipality VARCHAR(40),
	Department VARCHAR(40)
);

CREATE TABLE PoliceRecords(
	PoliceRecordID INT IDENTITY(1,1) PRIMARY KEY,
	Link TEXT
);

CREATE TABLE CriminalRecords(
	CriminalRecordID INT IDENTITY(1,1) PRIMARY KEY,
	Link TEXT
);

CREATE TABLE Department(
	DepartmentID INT IDENTITY(1,1) PRIMARY KEY,
	NameDepartment VARCHAR(40) NOT NULL
);


CREATE TABLE CivilStatus(
	CivilStatusID INT IDENTITY(1,1) PRIMARY KEY,
	CivilStatus VARCHAR(30) NOT NULL
);

CREATE TABLE OthersPayments(
	OtherPaymentID INT IDENTITY(1,1) PRIMARY KEY,
	NameOthersPayment VARCHAR(30)
);



CREATE TABLE TypeTickets(
	TypeTicketID INT IDENTITY(1,1) PRIMARY KEY,
	NameTypeTickets VARCHAR(40) NOT NULL,
	DescriptionTypeTickets TEXT
);

CREATE TABLE Employees(
	EmployeedID INT IDENTITY(1,1) PRIMARY KEY,
	fk_User INT,
	fk_BranchOffice INT,
	fk_CivilStatus INT,
	fk_Departmanet INT,
	fk_Contract INT,
	fk_CriminalRecord INT,
	fk_PoliceRecord INT,
	fk_EmployeeAddress INT,

	FOREIGN KEY (fk_User) REFERENCES Users(UserID),
	FOREIGN KEY (fk_BranchOffice) REFERENCES BranchOffices(BranchOfficeID),
	FOREIGN KEY (fk_CivilStatus) REFERENCES CivilStatus(CivilStatusID),
	FOREIGN KEY (fk_Departmanet) REFERENCES Department(DepartmentID),
	FOREIGN KEY (fk_Contract) REFERENCES Contracts(ContractID),
	FOREIGN KEY (fk_CriminalRecord) REFERENCES CriminalRecords(CriminalRecordID),
	FOREIGN KEY (fk_PoliceRecord) REFERENCES PoliceRecords(PoliceRecordID),
	FOREIGN KEY (fk_EmployeeAddress) REFERENCES EmployeeAddresses(EmployeeAddressID)
);


CREATE TABLE JobHistory(
	JobHistoryID INT IDENTITY(1,1) PRIMARY KEY,
	fk_Employee INT,
	StartDate DATE NOT NULL,
	EndDate DATE,

	FOREIGN KEY (fk_Employee) REFERENCES Employees(EmployeedID)
); 

CREATE TABLE OtherPaymentsEmployees(
	OtherPayEmployeeID INT IDENTITY(1,1) PRIMARY KEY,
	fk_Employee INT,
	fk_OtherPayment INT,
	AmountPayable SMALLINT NOT NULL,
	StatusPayment VARCHAR(30) NOT NULL,

	FOREIGN KEY (fk_Employee) REFERENCES Employees(EmployeedID),
	FOREIGN KEY (fk_OtherPayment) REFERENCES OthersPayments(OtherPaymentID)
);

CREATE TABLE AbsentEmployees(
	EmployeeAbsentID INT IDENTITY(1,1) PRIMARY KEY,
	fk_Employeed INT,
	fk_Absence INT,
	StartAbsence DATE,
	EndAbsence DATE,

	FOREIGN KEY (fk_Employeed) REFERENCES Employees(EmployeedID),
	FOREIGN KEY (fk_Absence) REFERENCES Absences(AbsenceID)
);

CREATE TABLE MemorandumsEmployees(
	MemorandumEmployeeID INT IDENTITY(1,1) PRIMARY KEY,
	fk_Employee INT,
	fk_Memorandum INT,
	Link TEXT,
	StatusMemorandums VARCHAR(30),

	FOREIGN KEY (fk_Employee) REFERENCES Employees(EmployeedID),
	FOREIGN KEY (fk_Memorandum) REFERENCES Memorandums(MemorandumID)
);


CREATE TABLE Tickets(
	TicketID INT IDENTITY(1,1) PRIMARY KEY,
	fk_Employee INT,
	fk_TypeTicket INT,
	DateTickets DATE,

	FOREIGN KEY (fk_Employee) REFERENCES Employees(EmployeedID),
	FOREIGN KEY (fk_TypeTicket) REFERENCES  TypeTickets(TypeTicketID)
);

CREATE TABLE ReprintInvoices(
	ReprintInvoiceID INT IDENTITY(1,1) PRIMARY KEY,
	fk_Employeed INT,
	fk_Invoice_Detail INT,
	Quantity TINYINT,
	DateCreated DATETIME,

	FOREIGN KEY (fk_Employeed) REFERENCES Employees(EmployeedID),
	FOREIGN KEY (fk_Invoice_Detail) REFERENCES InvoicesDetail(InvoiceDetailID)
);
GO
