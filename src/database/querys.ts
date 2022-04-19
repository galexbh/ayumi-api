export const moduleQueries = {
  getAllModule: `SELECT ModuleID, NameModules FROM Modules;`,
  addNewModule: `INSERT INTO Modules (NameModules) VALUES(@NameModules);`,
  deleteModule: `DELETE FROM Modules WHERE ModuleID=@Id;`,
  updateModule: `UPDATE Modules SET NameModules=@NameModules WHERE ModuleID=@Id;`,
};

export const emailQueries = {
  getAllEmail: `SELECT EmailID, Email FROM Emails;`,
  addNewEmail: `INSERT INTO Emails (Email) VALUES(@Email); SELECT SCOPE_IDENTITY() AS id;`,
  deleteEmail: `DELETE FROM Emails WHERE EmailID=@Id;`,
  updateEmail: `UPDATE Emails SET Email=@NewEmail WHERE Email=@OldEmail;`,
};

export const rolQueries = {
  getAllRol: `SELECT RolID, NameRoles FROM Roles;`,
  addNewRol: `INSERT INTO Roles (NameRoles) VALUES(@NameRoles);`,
  deleteRol: `DELETE FROM Roles WHERE RolID=@Id;`,
  updateRol: `UPDATE Roles SET NameRoles=@NameRoles WHERE RolID=@Id;`,
};

export const phoneNumberQueries = {
  getAllPhoneNumber: `SELECT PhoneNumberID, PhoneNumber FROM PhoneNumbers;`,
  addNewPhoneNumber: `INSERT INTO PhoneNumbers (PhoneNumber) VALUES(@PhoneNumber); SELECT SCOPE_IDENTITY() AS id;`,
  deletePhoneNumber: `DELETE FROM PhoneNumbers WHERE PhoneNumberID=@Id;`,
  updatePhoneNumber: `UPDATE PhoneNumbers SET PhoneNumber=@NewPhoneNumber WHERE PhoneNumber=@OldPhoneNumber;`,
};

export const userQueries = {
  getAllUser: `SELECT UserID, r.NameRoles, pn.PhoneNumber, e.Email, FirsName, MiddleName, LastNamePaternal, LastNameMaternal, Age, Sex, RTN, PasswordUser, DateBirth, DateCreated FROM Users
  INNER JOIN Roles AS r ON Users.fk_rol = r.RolID
  INNER JOIN PhoneNumbers AS pn ON Users.fk_phoneNumber = pn.PhoneNumberID
  INNER JOIN Emails AS e ON Users.fk_email  = e.EmailID;`,
  addNewUser: `INSERT INTO Users (fk_rol, fk_phoneNumber, fk_email, FirsName, MiddleName, LastNamePaternal, LastNameMaternal, Age, Sex, RTN, PasswordUser, DateBirth, DateCreated) VALUES(@fk_rol, @fk_phoneNumber, @fk_email, @FirsName, @MiddleName, @LastNamePaternal, @LastNameMaternal, @Age, @Sex, @RTN, @PasswordUser, @DateBirth, @DateCreated);`,
  deleteUser: `DELETE FROM Users WHERE UserID=@Id;`,
  updateUser: `UPDATE Users SET RTN=@RTN, PasswordUser=@Password WHERE UserID=@Id;`,
  updateUserRol: `UPDATE Users SET fk_rol=@fk_rol WHERE UserID=@UserID;`,
  getUserByEmail: `SELECT Users.UserID, Users.fk_rol, pn.PhoneNumber, e.Email, Users.FirsName, Users.MiddleName, Users.LastNamePaternal, Users.LastNameMaternal, Users.Age, Users.Sex, Users.RTN, Users.PasswordUser, Users.DateBirth FROM Users
  INNER JOIN PhoneNumbers AS pn ON Users.fk_phoneNumber = pn.PhoneNumberID
  INNER JOIN Emails AS e ON (Users.fk_email  = e.EmailID) WHERE e.Email = @Email;`,
  getUserById: `SELECT UserID, fk_rol, fk_phoneNumber, fk_email, FirsName, MiddleName, LastNamePaternal, LastNameMaternal, Age, Sex, RTN, PasswordUser, DateBirth, DateCreated FROM Users WHERE UserID=@Id;`,
};
