CREATE SCHEMA TestSchema;
GO

CREATE TABLE TestSchema.Employees(
    Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Name NVARCHAR(50),
    Location NVARCHAR(50) 
);
GO

INSERT INTO TestSchema.Employees(Name,Location) VALUES
('ANAY','INDIA'),
('XXXYYY','PAKISTAN'),
('RRRR','CHINA');
GO

SELECT * FROM TestSchema.Employees;
GO