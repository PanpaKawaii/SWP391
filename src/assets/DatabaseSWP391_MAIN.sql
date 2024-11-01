--USE MASTER

--DROP DATABASE SWP391


--CREATE DATABASE SWP391

--USE SWP391


DROP TABLE [UtilityPod]
GO
DROP TABLE [SlotBooking]
GO
DROP TABLE [BookingOrder]
GO
DROP TABLE [Payment]
GO
DROP TABLE [Booking]
GO
DROP TABLE [Slot]
GO
DROP TABLE [Pod]
GO
DROP TABLE [Utility]
GO
DROP TABLE [Product]
GO
DROP TABLE [Store]
GO
DROP TABLE [User]
GO
DROP TABLE [Type]
GO
DROP TABLE [Category]
GO
--Booking đã có Rating
--Booking đã có CurrentDate
--Pod còn giữ Rating
--Store đã có Image
--Store đã có Status

CREATE TABLE [Utility] (
	Id				INT NOT NULL,
	Name			NVARCHAR(255) NULL,
	Image			NVARCHAR(255) NULL,
	Description		NVARCHAR(255) NULL,
	PRIMARY KEY (Id)
);

CREATE TABLE [Pod] (
	Id				INT NOT NULL,
	Name			NVARCHAR(255) NULL,
	Image			NVARCHAR(255) NULL,
	Description		NVARCHAR(255) NULL,
	Rating			INT NULL,
	Status			NVARCHAR(255) NULL,
	TypeId			INT NOT NULL,
	StoreId			INT NOT NULL,
	PRIMARY KEY (Id)
);

CREATE TABLE [UtilityPod] (
	UtilityId		INT NOT NULL,
	PodId			INT NOT NULL,
	PRIMARY KEY (UtilityId, PodId)
);

CREATE TABLE [Type] (
	Id				INT NOT NULL,
	Name			NVARCHAR(255) NULL,
	Capacity		INT NULL,
	PRIMARY KEY (Id)
);

CREATE TABLE [Slot] (
	Id				INT NOT NULL,
	Name			NVARCHAR(255) NULL,
	StartTime		INT NULL,
	EndTime			INT NULL,
	Price			INT NULL,
	Status			NVARCHAR(255) NULL,
	PodId			INT NOT NULL,
	PRIMARY KEY (Id)
);

CREATE TABLE [Booking] (
	Id				INT NOT NULL,
	Date			DATE NULL,
	CurrentDate		DATETIME NULL,
	Status			NVARCHAR(255) NULL,
	Rating			INT NULL,
	Feedback		NVARCHAR(255) NULL,
	PodId			INT NOT NULL,
	UserId			INT NOT NULL,
	PRIMARY KEY (Id)
);

CREATE TABLE [SlotBooking] (
	SlotId			INT NOT NULL,
	BookingId		INT NOT NULL,
	PRIMARY KEY (SlotId, BookingId)
);

CREATE TABLE [Payment] (
	Id				INT NOT NULL,
	Method			NVARCHAR(255) NULL,
	Amount			INT NULL,
	Date			DATE NULL,
	Status			NVARCHAR(255) NULL,
	BookingId		INT NOT NULL,
	PRIMARY KEY (Id)
);

CREATE TABLE [User] (
	Id				INT NOT NULL,
	Email			NVARCHAR(255) NULL,
	Password		NVARCHAR(255) NULL,
	Name			NVARCHAR(255) NULL,
	Image			NVARCHAR(255) NULL,
	Role			NVARCHAR(255) CHECK (Role IN ('Admin','Staff','User')),
	Type			NVARCHAR(255) CHECK (Type IN ('VIP','Regular')),
	PhoneNumber		NVARCHAR(255) NULL,
	Point			INT NULL,
	Description		NVARCHAR(255) NULL,
	PRIMARY KEY (Id)
);

CREATE TABLE [Store] (
	Id				INT NOT NULL,
	Name			NVARCHAR(255) NULL,
	Image			NVARCHAR(255) NULL,
	Address			NVARCHAR(255) NULL,
	Contact			NVARCHAR(255) NULL,
	Status			NVARCHAR(255) NULL,
	PRIMARY KEY (Id)
);

CREATE TABLE [Product] (
	Id				INT NOT NULL,
	Name			NVARCHAR(255) NULL,
	Price			INT NULL,
	Description		NVARCHAR(255) NULL,
	Rating			INT NULL,
	Stock			INT NULL,
	StoreId			INT NOT NULL,
	CategoryId		INT NOT NULL,
	PRIMARY KEY (Id)
);

CREATE TABLE [BookingOrder] (
	Id				INT NOT NULL,
	Amount			INT NULL,
	Quantity		INT NULL,
	Status			NVARCHAR(255) NULL,
	Date			DATE NULL,
	BookingId		INT NOT NULL,
	ProductId		INT NOT NULL,
	PRIMARY KEY (Id)
);

CREATE TABLE [Category] (
	Id				INT NOT NULL,
	Name			NVARCHAR(255) NULL,
	Status			NVARCHAR(255) NULL,
	PRIMARY KEY (Id)
);

ALTER TABLE [Pod] ADD CONSTRAINT FkPodType FOREIGN KEY (TypeId) REFERENCES [Type](Id);
ALTER TABLE [Pod] ADD CONSTRAINT FkPodStore FOREIGN KEY (StoreId) REFERENCES [Store](Id);
ALTER TABLE [Slot] ADD CONSTRAINT FkSlotPod FOREIGN KEY (PodId) REFERENCES [Pod](Id);
ALTER TABLE [Booking] ADD CONSTRAINT FkBookingPod FOREIGN KEY (PodId) REFERENCES [Pod](Id);
ALTER TABLE [Booking] ADD CONSTRAINT FkBookingUser FOREIGN KEY (UserId) REFERENCES [User](Id);
ALTER TABLE [Payment] ADD CONSTRAINT FkPaymentBooking FOREIGN KEY (BookingId) REFERENCES [Booking](Id);
ALTER TABLE [Product] ADD CONSTRAINT FkProductStore FOREIGN KEY (StoreId) REFERENCES [Store](Id);
ALTER TABLE [Product] ADD CONSTRAINT FkProductCategory FOREIGN KEY (CategoryId) REFERENCES [Category](Id);
ALTER TABLE [UtilityPod] ADD CONSTRAINT FkUtility FOREIGN KEY (UtilityId) REFERENCES [Utility](Id);
ALTER TABLE [UtilityPod] ADD CONSTRAINT FkPod FOREIGN KEY (PodId) REFERENCES [Pod](Id);
ALTER TABLE [SlotBooking] ADD CONSTRAINT FkSlot FOREIGN KEY (SlotId) REFERENCES [Slot](Id);
ALTER TABLE [SlotBooking] ADD CONSTRAINT FkBooking FOREIGN KEY (BookingId) REFERENCES [Booking](Id);
ALTER TABLE [BookingOrder] ADD CONSTRAINT FkBookingOrderBooking FOREIGN KEY (BookingId) REFERENCES [Booking](Id);
ALTER TABLE [BookingOrder] ADD CONSTRAINT FkBookingOrderProduct FOREIGN KEY (ProductId) REFERENCES [Product](Id);



--INSERT DATA INTO TABLES

--Insert into Store 2 cái
INSERT INTO [Store] (Id, Name, Image, Address, Contact, Status) VALUES
(1, N'InnoSpace Phong Cách', N'https://i.pinimg.com/736x/61/a8/f8/61a8f8a0d09150cd0cc3360fcf969c1d.jpg', N'12 Đường Sáng Tạo, Thủ Đức', N'0922678301', N'Đang hoạt động'),
(2, N'Super InnoSpace', N'https://i.pinimg.com/736x/cf/fd/71/cffd712ca3fa90d9d51e07c6bef69cad.jpg', N'34 Đại lộ Kinh Doanh, Thủ Đức', N'0995678017', N'Đang hoạt động'),
(3, N'InnoSpace GenZ', N'https://i.pinimg.com/736x/ef/8d/36/ef8d36299d166595edd6e0a56d6ff351.jpg', N'14 Đường Đa Dạng, Thủ Đức', N'0922678303', N'Đang hoạt động'),
(4, N'InnoSpaceMAX', N'https://i.pinimg.com/736x/b0/b5/c3/b0b5c33cc9bc91230da3e45d13c5ead6.jpg', N'32 Đại lộ Thăng Tiến, Thủ Đức', N'0995678015', N'Đang hoạt động');

--Insert into Type 4 cái
INSERT INTO [Type] (Id, Name, Capacity) VALUES
(1, N'POD Phòng Đơn', 1),
(2, N'POD Phòng Đôi', 2),
(3, N'POD Phòng Nhóm', 6),
(4, N'POD Phòng Họp', 10);


--Insert into Pod 24 cái
INSERT INTO [Pod] (Id, Name, Image, Description, Rating, Status, TypeId, StoreId) VALUES

--Store1
--POD đơn 80 70 60
(1, N'POD Cao Cấp', 'https://i.pinimg.com/736x/62/b6/6e/62b66edc40dc61616d0ea9b0aa7c4de9.jpg', N'Một không gian làm việc sang trọng với các tiện nghi cao cấp', 5, N'Đang hoạt động', 1, 1),
(2, N'POD Tiêu Chuẩn', 'https://i.pinimg.com/736x/ae/5c/65/ae5c658be46075d6c6cd73e7ad79da81.jpg', N'Một không gian làm việc tiêu chuẩn với đầy đủ các tính năng cần thiết', 5, N'Đang hoạt động', 1, 1),
(3, N'POD Sáng Tạo', 'https://i.pinimg.com/736x/24/b8/07/24b8072892a15f3820e7950370905c50.jpg', N'Không gian thiết kế độc đáo, truyền cảm hứng sáng tạo', 5, N'Đang hoạt động', 1, 1),
--Store2
--POD đơn
(4, N'POD Cao Cấp', 'https://i.pinimg.com/736x/81/fb/c3/81fbc353c68767c519efae9c6cce88e7.jpg', N'Một không gian làm việc sang trọng với các tiện nghi cao cấp', 5, N'Đang hoạt động', 1, 2),
(5, N'POD Tiêu Chuẩn', 'https://i.pinimg.com/736x/a8/39/c7/a839c796c7ab4e56cdd9a535d3cb556e.jpg', N'Một không gian làm việc tiêu chuẩn với đầy đủ các tính năng cần thiết', 5, N'Đang hoạt động', 1, 2),
(6, N'POD Sáng Tạo', 'https://i.pinimg.com/736x/e9/06/4e/e9064e1b0c275bab3aaffab59e79acca.jpg', N'Không gian thiết kế độc đáo, truyền cảm hứng sáng tạo', 5, N'Đang hoạt động', 1, 2),

--Store1
--POD đôi 100 90 80
(7, N'POD Cao Cấp', 'https://i.pinimg.com/736x/61/11/5b/61115bb126f640b682a483361e4c7d5c.jpg', N'Một không gian làm việc sang trọng với các tiện nghi cao cấp', 5, N'Đang hoạt động', 2, 1),
(8, N'POD Tiêu Chuẩn', 'https://i.pinimg.com/736x/3c/74/2b/3c742b84a79074a1e9c8ca49fd8121d6.jpg', N'Một không gian làm việc tiêu chuẩn với đầy đủ các tính năng cần thiết', 5, N'Đang hoạt động', 2, 1),
(9, N'POD Sáng Tạo', 'https://i.pinimg.com/736x/cd/51/74/cd5174bdb5768ddbd460c70f84484b96.jpg', N'Không gian thiết kế độc đáo, truyền cảm hứng sáng tạo', 5, N'Đang hoạt động', 2, 1),
--Store2
--POD đôi
(10, N'POD Cao Cấp', 'https://i.pinimg.com/736x/43/ad/bd/43adbdbf1da48f4f579a087b313da453.jpg', N'Một không gian làm việc sang trọng với các tiện nghi cao cấp', 5, N'Đang hoạt động', 2, 2),
(11, N'POD Tiêu Chuẩn', 'https://i.pinimg.com/736x/93/d7/b6/93d7b60b459514aebd2238939993984e.jpg', N'Một không gian làm việc tiêu chuẩn với đầy đủ các tính năng cần thiết', 5, N'Đang hoạt động', 2, 2),
(12, N'POD Sáng Tạo', 'https://i.pinimg.com/736x/32/bd/ff/32bdff1f03079f9542c286bd98bf004d.jpg', N'Không gian thiết kế độc đáo, truyền cảm hứng sáng tạo', 5, N'Đang hoạt động', 2, 2),

--Store1
--POD nhóm 120 110 100
(13, N'POD Cao Cấp', 'https://i.pinimg.com/736x/ca/58/b3/ca58b3e98a398800582d162f049712c3.jpg', N'Một không gian làm việc sang trọng với các tiện nghi cao cấp', 5, N'Đang hoạt động', 3, 1),
(14, N'POD Tiêu Chuẩn', 'https://i.pinimg.com/736x/a4/58/44/a45844b1dba7b6b75d31251a351c3c40.jpg', N'Một không gian làm việc tiêu chuẩn với đầy đủ các tính năng cần thiết', 5, N'Đang hoạt động', 3, 1),
(15, N'POD Sáng Tạo', 'https://i.pinimg.com/736x/ce/7e/c4/ce7ec4edf53ce563e01a1e98b7cde644.jpg', N'Không gian thiết kế độc đáo, truyền cảm hứng sáng tạo', 5, N'Đang hoạt động', 3, 1),
--Store2
--POD nhóm
(16, N'POD Cao Cấp', 'https://i.pinimg.com/736x/2f/e1/b0/2fe1b059e0492dcb12fa2a181b1ddaf9.jpg', N'Một không gian làm việc sang trọng với các tiện nghi cao cấp', 5, N'Đang hoạt động', 3, 2),
(17, N'POD Tiêu Chuẩn', 'https://i.pinimg.com/736x/37/13/9b/37139b3fc7733523389731ab5ccb0734.jpg', N'Một không gian làm việc tiêu chuẩn với đầy đủ các tính năng cần thiết', 5, N'Đang hoạt động', 3, 2),
(18, N'POD Sáng Tạo', 'https://i.pinimg.com/736x/99/bd/eb/99bdeb6e29ce35046e95b126cbccbba6.jpg', N'Không gian thiết kế độc đáo, truyền cảm hứng sáng tạo', 5, N'Đang hoạt động', 3, 2),

--Store1
--POD phòng họp 200 190 180
(19, N'POD Cao Cấp', 'https://i.pinimg.com/736x/80/2b/88/802b88945ec921db99eb07c7844162c8.jpg', N'Một không gian làm việc sang trọng với các tiện nghi cao cấp', 5, N'Đang hoạt động', 4, 1),
(20, N'POD Tiêu Chuẩn', 'https://i.pinimg.com/736x/3d/e5/f6/3de5f621990237dbf2794059f0f6c489.jpg', N'Một không gian làm việc tiêu chuẩn với đầy đủ các tính năng cần thiết', 5, N'Đang hoạt động', 4, 1),
(21, N'POD Sáng Tạo', 'https://i.pinimg.com/736x/8e/2f/78/8e2f78150f6669cdb1d2500a178972fd.jpg', N'Không gian thiết kế độc đáo, truyền cảm hứng sáng tạo', 5, N'Đang hoạt động', 4, 1),
--Store2
--POD phòng họp
(22, N'POD Cao Cấp', 'https://i.pinimg.com/736x/24/ae/58/24ae58f5c403ce7d26aabecf309a41d1.jpg', N'Một không gian làm việc sang trọng với các tiện nghi cao cấp', 5, N'Đang hoạt động', 4, 2),
(23, N'POD Tiêu Chuẩn', 'https://i.pinimg.com/736x/b6/1d/97/b61d970a495ada274b3c4e09297293f0.jpg', N'Một không gian làm việc tiêu chuẩn với đầy đủ các tính năng cần thiết', 5, N'Đang hoạt động', 4, 2),
(24, N'POD Sáng Tạo', 'https://i.pinimg.com/474x/e8/92/75/e89275f5a7e888873be863212f790a25.jpg', N'Không gian thiết kế độc đáo, truyền cảm hứng sáng tạo', 5, N'Đang hoạt động', 4, 2);


--Insert into Utility
INSERT INTO [Utility] (Id, Name, Image, Description) VALUES
(1, N'Ổ cắm điện', N'https://i.pinimg.com/474x/ff/5b/66/ff5b66a34d34a8c101eda717ea333b06.jpg', N'Cung cấp thêm ổ cắm cho các thiết bị điện tử'),
(2, N'Máy chiếu', N'https://i.pinimg.com/736x/32/62/82/326282d100a24368406b9cb4ac4cd64f.jpg', N'Dành cho các buổi thuyết trình và họp'),
(3, N'Máy pha cà phê', N'https://i.pinimg.com/736x/ab/41/c0/ab41c0126f85a6ad4e16787e93f2c088.jpg', N'Có cà phê miễn phí'),
(4, N'Hệ thống âm thanh', N'https://i.pinimg.com/736x/ce/0b/dd/ce0bdd5b9cd9449bd9e3c12660e574d1.jpg', N'Âm thanh chất lượng cao cho các buổi họp'),
(5, N'Bảng trắng thông minh', N'https://i.pinimg.com/736x/07/ce/af/07ceafc10f01c263b9bbd08161b6d4c5.jpg', N'Bảng viết điện tử cho các buổi thảo luận và họp');


--Insert into UtilityPod
INSERT INTO [UtilityPod] (UtilityId, PodId) VALUES 

--Tất cả loại phòng đều có thể có ổ điện
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(1, 22),
(1, 23),
(1, 24),

--Chỉ phòng họp có máy chiếu
(2, 19),
(2, 20),
(2, 21),
(2, 22),
(2, 23),
(2, 24),

--Chỉ phòng họp có máy pha cà phê
(3, 19),
(3, 20),
(3, 21),
(3, 22),
(3, 23),
(3, 24),

--Chỉ phòng họp có hệ thống âm thanh
(4, 19),
(4, 20),
(4, 21),
(4, 22),
(4, 23),
(4, 24),

--Chỉ phòng họp và POD nhóm bảng trắng thông minh

--Phòng họp
(5, 19),
(5, 20),
(5, 21),
(5, 22),
(5, 23),
(5, 24),

--Nhóm
(5, 13),
(5, 14),
(5, 15),
(5, 16),
(5, 17),
(5, 18);


--Insert into User
INSERT INTO [User] (Id, Email, Password, Name, Image, Role, Type, PhoneNumber, Point, Description) VALUES
(1, 'nguyenvanan@gmail.com', 'User001', N'Nguyễn Văn An', N'https://i.pinimg.com/236x/5b/aa/16/5baa16a0815af2a12ce084163a801be0.jpg', 'User', 'VIP', '0123456789', 10000, N'Khách hàng ưu tiên'),
(2, 'tranbao@gmail.com', 'User002', N'Trần Thiên Bảo', N'https://i.pinimg.com/236x/9b/a2/e9/9ba2e9d58cf4d2a989aeb60e3e6d72b4.jpg', 'User', 'Regular', N'0987654321', 500, N'Khách hàng mới'),
(3, 'lequanghai@gmail.com', 'User003', N'Lê Quang Hải', N'https://i.pinimg.com/236x/02/d9/91/02d9916c89e52fd62db4820a90de89bf.jpg', 'User', 'VIP', N'0912345678', 10500, N'Khách hàng ưu tiên'),
(4, 'phamthanhdat@gmail.com', 'User004', N'Phạm Thành Đạt', N'https://i.pinimg.com/236x/8d/0d/90/8d0d90d7e668af83b89d9ae6611ed4da.jpg', 'User', 'Regular', N'0934567890', 7000, N'Khách hàng tiềm năng'),
(5, 'hoangvanchuong@gmail.com', 'User005', N'Hoàng Văn Chương', N'https://i.pinimg.com/236x/ea/ec/e7/eaece79e363b7689a0b306f7b68573e4.jpg', 'User', 'VIP', N'0945678901', 12000, N'Khách hàng ưu tiên'),
(6, 'vothituyet@gmail.com', 'User006', N'Võ Thị Tuyết', N'https://i.pinimg.com/736x/63/3a/20/633a20dd72ccfac027dc45fc595c3b52.jpg', 'User', 'Regular', N'0956789012', 5500, N'Khách hàng cũ'),
(7, 'nguyenhuugiang@gmail.com', 'User007', N'Nguyễn Hữu Giang', N'https://i.pinimg.com/236x/a8/40/e5/a840e5f8e0d2df36926baf2e5f886205.jpg', 'User', 'VIP', N'0967890123', 12500, N'Khách hàng ưu tiên'),
(8, 'dothanhha@gmail.com', 'User008', N'Đỗ Thanh Hà', N'https://i.pinimg.com/236x/19/f4/6c/19f46c0682d66bafded22dd4f8c5e1c5.jpg', 'User', 'Regular', N'0978901234', 1000, N'Khách hàng mới'),

(9, 'dangngochaitrieu@gmail.com', 'User009', N'Đặng Ngọc Hải Triều', N'https://i.pinimg.com/564x/a2/5f/98/a25f983caa7dfd0fd5a6f87b31931835.jpg', 'Admin', 'VIP', N'0978901234', 10000, N'Nhà điều hành'),
(10, 'truongkimhang@gmail.com', 'User010', N'Trương Kim Hằng', N'https://i.pinimg.com/564x/f0/cc/1a/f0cc1afb564c29f091c30584ab06e87a.jpg', 'Staff', 'VIP', N'0978901234', 10000, N'Quản lý'),
(11, 'phamthanhdanh@gmail.com', 'User011', N'Phạm Thành Danh', N'https://i.pinimg.com/564x/3f/d5/c1/3fd5c1ab5e9d01ced7333d15359088bd.jpg', 'Staff', 'VIP', N'0978901234', 10000, N'Quản lý'),
(12, 'nguyenthanhduong@gmail.com', 'User012', N'Nguyễn Thành Dương', N'https://i.pinimg.com/564x/59/e3/b8/59e3b8b6e07b77f9259201a793ad1462.jpg', 'Staff', 'VIP', N'0978901234', 10000, N'Quản lý');


--Insert into Slot
INSERT INTO [Slot] (Id, Name, StartTime, EndTime, Price, Status, PodId) VALUES

--Slot 1
(1, N'Slot 1', 7, 9, 80000, N'Đang hoạt động', 1),
(2, N'Slot 1', 7, 9, 70000, N'Đang hoạt động', 2),
(3, N'Slot 1', 7, 9, 60000, N'Đang hoạt động', 3),
(4, N'Slot 1', 7, 9, 80000, N'Đang hoạt động', 4),
(5, N'Slot 1', 7, 9, 70000, N'Đang hoạt động', 5),
(6, N'Slot 1', 7, 9, 60000, N'Đang hoạt động', 6),
(7, N'Slot 1', 7, 9, 100000, N'Đang hoạt động', 7),
(8, N'Slot 1', 7, 9, 90000, N'Đang hoạt động', 8),
(9, N'Slot 1', 7, 9, 80000, N'Đang hoạt động', 9),
(10, N'Slot 1', 7, 9, 100000, N'Đang hoạt động', 10),
(11, N'Slot 1', 7, 9, 90000, N'Đang hoạt động', 11),
(12, N'Slot 1', 7, 9, 80000, N'Đang hoạt động', 12),

(13, N'Slot 1', 7, 9, 120000, N'Đang hoạt động', 13),
(14, N'Slot 1', 7, 9, 110000, N'Đang hoạt động', 14),
(15, N'Slot 1', 7, 9, 100000, N'Đang hoạt động', 15),
(16, N'Slot 1', 7, 9, 120000, N'Đang hoạt động', 16),
(17, N'Slot 1', 7, 9, 110000, N'Đang hoạt động', 17),
(18, N'Slot 1', 7, 9, 100000, N'Đang hoạt động', 18),
(19, N'Slot 1', 7, 9, 200000, N'Đang hoạt động', 19),
(20, N'Slot 1', 7, 9, 190000, N'Đang hoạt động', 20),
(21, N'Slot 1', 7, 9, 180000, N'Đang hoạt động', 21),
(22, N'Slot 1', 7, 9, 200000, N'Đang hoạt động', 22),
(23, N'Slot 1', 7, 9, 190000, N'Đang hoạt động', 23),
(24, N'Slot 1', 7, 9, 180000, N'Đang hoạt động', 24),

--Slot 2
(25, N'Slot 2', 10, 12, 80000, N'Đang hoạt động', 1),
(26, N'Slot 2', 10, 12, 70000, N'Đang hoạt động', 2),
(27, N'Slot 2', 10, 12, 60000, N'Đang hoạt động', 3),
(28, N'Slot 2', 10, 12, 80000, N'Đang hoạt động', 4),
(29, N'Slot 2', 10, 12, 70000, N'Đang hoạt động', 5),
(30, N'Slot 2', 10, 12, 60000, N'Đang hoạt động', 6),
(31, N'Slot 2', 10, 12, 100000, N'Đang hoạt động', 7),
(32, N'Slot 2', 10, 12, 90000, N'Đang hoạt động', 8),
(33, N'Slot 2', 10, 12, 80000, N'Đang hoạt động', 9),
(34, N'Slot 2', 10, 12, 100000, N'Đang hoạt động', 10),
(35, N'Slot 2', 10, 12, 90000, N'Đang hoạt động', 11),
(36, N'Slot 2', 10, 12, 80000, N'Đang hoạt động', 12),

(37, N'Slot 2', 10, 12, 120000, N'Đang hoạt động', 13),
(38, N'Slot 2', 10, 12, 110000, N'Đang hoạt động', 14),
(39, N'Slot 2', 10, 12, 100000, N'Đang hoạt động', 15),
(40, N'Slot 2', 10, 12, 120000, N'Đang hoạt động', 16),
(41, N'Slot 2', 10, 12, 110000, N'Đang hoạt động', 17),
(42, N'Slot 2', 10, 12, 100000, N'Đang hoạt động', 18),
(43, N'Slot 2', 10, 12, 200000, N'Đang hoạt động', 19),
(44, N'Slot 2', 10, 12, 190000, N'Đang hoạt động', 20),
(45, N'Slot 2', 10, 12, 180000, N'Đang hoạt động', 21),
(46, N'Slot 2', 10, 12, 200000, N'Đang hoạt động', 22),
(47, N'Slot 2', 10, 12, 190000, N'Đang hoạt động', 23),
(48, N'Slot 2', 10, 12, 180000, N'Đang hoạt động', 24),

--Slot 3
(49, N'Slot 3', 13, 15, 80000, N'Đang hoạt động', 1),
(50, N'Slot 3', 13, 15, 70000, N'Đang hoạt động', 2),
(51, N'Slot 3', 13, 15, 60000, N'Đang hoạt động', 3),
(52, N'Slot 3', 13, 15, 80000, N'Đang hoạt động', 4),
(53, N'Slot 3', 13, 15, 70000, N'Đang hoạt động', 5),
(54, N'Slot 3', 13, 15, 60000, N'Đang hoạt động', 6),
(55, N'Slot 3', 13, 15, 100000, N'Đang hoạt động', 7),
(56, N'Slot 3', 13, 15, 90000, N'Đang hoạt động', 8),
(57, N'Slot 3', 13, 15, 80000, N'Đang hoạt động', 9),
(58, N'Slot 3', 13, 15, 100000, N'Đang hoạt động', 10),
(59, N'Slot 3', 13, 15, 90000, N'Đang hoạt động', 11),
(60, N'Slot 3', 13, 15, 80000, N'Đang hoạt động', 12),

(61, N'Slot 3', 13, 15, 120000, N'Đang hoạt động', 13),
(62, N'Slot 3', 13, 15, 110000, N'Đang hoạt động', 14),
(63, N'Slot 3', 13, 15, 100000, N'Đang hoạt động', 15),
(64, N'Slot 3', 13, 15, 120000, N'Đang hoạt động', 16),
(65, N'Slot 3', 13, 15, 110000, N'Đang hoạt động', 17),
(66, N'Slot 3', 13, 15, 100000, N'Đang hoạt động', 18),
(67, N'Slot 3', 13, 15, 200000, N'Đang hoạt động', 19),
(68, N'Slot 3', 13, 15, 190000, N'Đang hoạt động', 20),
(69, N'Slot 3', 13, 15, 180000, N'Đang hoạt động', 21),
(70, N'Slot 3', 13, 15, 200000, N'Đang hoạt động', 22),
(71, N'Slot 3', 13, 15, 190000, N'Đang hoạt động', 23),
(72, N'Slot 3', 13, 15, 180000, N'Đang hoạt động', 24),

--Slot 4
(73, N'Slot 4', 16, 18, 80000, N'Đang hoạt động', 1),
(74, N'Slot 4', 16, 18, 70000, N'Đang hoạt động', 2),
(75, N'Slot 4', 16, 18, 60000, N'Đang hoạt động', 3),
(76, N'Slot 4', 16, 18, 80000, N'Đang hoạt động', 4),
(77, N'Slot 4', 16, 18, 70000, N'Đang hoạt động', 5),
(78, N'Slot 4', 16, 18, 60000, N'Đang hoạt động', 6),
(79, N'Slot 4', 16, 18, 100000, N'Đang hoạt động', 7),
(80, N'Slot 4', 16, 18, 90000, N'Đang hoạt động', 8),
(81, N'Slot 4', 16, 18, 80000, N'Đang hoạt động', 9),
(82, N'Slot 4', 16, 18, 100000, N'Đang hoạt động', 10),
(83, N'Slot 4', 16, 18, 90000, N'Đang hoạt động', 11),
(84, N'Slot 4', 16, 18, 80000, N'Đang hoạt động', 12),

(85, N'Slot 4', 16, 18, 120000, N'Đang hoạt động', 13),
(86, N'Slot 4', 16, 18, 110000, N'Đang hoạt động', 14),
(87, N'Slot 4', 16, 18, 100000, N'Đang hoạt động', 15),
(88, N'Slot 4', 16, 18, 120000, N'Đang hoạt động', 16),
(89, N'Slot 4', 16, 18, 110000, N'Đang hoạt động', 17),
(90, N'Slot 4', 16, 18, 100000, N'Đang hoạt động', 18),
(91, N'Slot 4', 16, 18, 200000, N'Đang hoạt động', 19),
(92, N'Slot 4', 16, 18, 190000, N'Đang hoạt động', 20),
(93, N'Slot 4', 16, 18, 180000, N'Đang hoạt động', 21),
(94, N'Slot 4', 16, 18, 200000, N'Đang hoạt động', 22),
(95, N'Slot 4', 16, 18, 190000, N'Đang hoạt động', 23),
(96, N'Slot 4', 16, 18, 180000, N'Đang hoạt động', 24),

--Slot 5
(97, N'Slot 5', 19, 21, 80000, N'Đang hoạt động', 1),
(98, N'Slot 5', 19, 21, 70000, N'Đang hoạt động', 2),
(99, N'Slot 5', 19, 21, 60000, N'Đang hoạt động', 3),
(100, N'Slot 5', 19, 21, 80000, N'Đang hoạt động', 4),
(101, N'Slot 5', 19, 21, 70000, N'Đang hoạt động', 5),
(102, N'Slot 5', 19, 21, 60000, N'Đang hoạt động', 6),
(103, N'Slot 5', 19, 21, 100000, N'Đang hoạt động', 7),
(104, N'Slot 5', 19, 21, 90000, N'Đang hoạt động', 8),
(105, N'Slot 5', 19, 21, 80000, N'Đang hoạt động', 9),
(106, N'Slot 5', 19, 21, 100000, N'Đang hoạt động', 10),
(107, N'Slot 5', 19, 21, 90000, N'Đang hoạt động', 11),
(108, N'Slot 5', 19, 21, 80000, N'Đang hoạt động', 12),

(109, N'Slot 5', 19, 21, 120000, N'Đang hoạt động', 13),
(110, N'Slot 5', 19, 21, 110000, N'Đang hoạt động', 14),
(111, N'Slot 5', 19, 21, 100000, N'Đang hoạt động', 15),
(112, N'Slot 5', 19, 21, 120000, N'Đang hoạt động', 16),
(113, N'Slot 5', 19, 21, 110000, N'Đang hoạt động', 17),
(114, N'Slot 5', 19, 21, 100000, N'Đang hoạt động', 18),
(115, N'Slot 5', 19, 21, 200000, N'Đang hoạt động', 19),
(116, N'Slot 5', 19, 21, 190000, N'Đang hoạt động', 20),
(117, N'Slot 5', 19, 21, 180000, N'Đang hoạt động', 21),
(118, N'Slot 5', 19, 21, 200000, N'Đang hoạt động', 22),
(119, N'Slot 5', 19, 21, 190000, N'Đang hoạt động', 23),
(120, N'Slot 5', 19, 21, 180000, N'Đang hoạt động', 24),

--Slot 6
(121, N'Slot 6', 22, 24, 80000, N'Đang hoạt động', 1),
(122, N'Slot 6', 22, 24, 70000, N'Đang hoạt động', 2),
(123, N'Slot 6', 22, 24, 60000, N'Đang hoạt động', 3),
(124, N'Slot 6', 22, 24, 80000, N'Đang hoạt động', 4),
(125, N'Slot 6', 22, 24, 70000, N'Đang hoạt động', 5),
(126, N'Slot 6', 22, 24, 60000, N'Đang hoạt động', 6),
(127, N'Slot 6', 22, 24, 100000, N'Đang hoạt động', 7),
(128, N'Slot 6', 22, 24, 90000, N'Đang hoạt động', 8),
(129, N'Slot 6', 22, 24, 80000, N'Đang hoạt động', 9),
(130, N'Slot 6', 22, 24, 100000, N'Đang hoạt động', 10),
(131, N'Slot 6', 22, 24, 90000, N'Đang hoạt động', 11),
(132, N'Slot 6', 22, 24, 80000, N'Đang hoạt động', 12),

(133, N'Slot 6', 22, 24, 120000, N'Đang hoạt động', 13),
(134, N'Slot 6', 22, 24, 110000, N'Đang hoạt động', 14),
(135, N'Slot 6', 22, 24, 100000, N'Đang hoạt động', 15),
(136, N'Slot 6', 22, 24, 120000, N'Đang hoạt động', 16),
(137, N'Slot 6', 22, 24, 110000, N'Đang hoạt động', 17),
(138, N'Slot 6', 22, 24, 100000, N'Đang hoạt động', 18),
(139, N'Slot 6', 22, 24, 200000, N'Đang hoạt động', 19),
(140, N'Slot 6', 22, 24, 190000, N'Đang hoạt động', 20),
(141, N'Slot 6', 22, 24, 180000, N'Đang hoạt động', 21),
(142, N'Slot 6', 22, 24, 200000, N'Đang hoạt động', 22),
(143, N'Slot 6', 22, 24, 190000, N'Đang hoạt động', 23),
(144, N'Slot 6', 22, 24, 180000, N'Đang hoạt động', 24);


--Insert into Booking
INSERT INTO [Booking] (Id, Date, CurrentDate, Status, Rating, Feedback, PodId, UserId) VALUES

--Đơn
(1, '2024-10-05', '2024-10-05 05:05:45', N'Đã kết thúc', 5, N'Dịch vụ tuyệt vời', 1, 3),
(2, '2024-10-06', '2024-10-06 05:16:36', N'Đã kết thúc', 4, '', 1, 4),
--Đôi
(3, '2024-10-07', '2024-10-07 05:27:27', N'Đã kết thúc', 5, N'Mọi thứ đều ổn', 6, 5),
--Nhóm
(4, '2024-10-08', '2024-10-08 05:38:18', N'Chưa diễn ra', 0, '', 8, 6),
--Phòng họp
(5, '2024-10-09', '2024-10-09 05:49:09', N'Đã kết thúc', 5, N'Rất hài lòng', 15, 7),

--Đơn
(6, '2024-10-10', '2024-10-10 05:50:50', N'Đã kết thúc', 5, N'Dịch vụ tốt', 14, 8),
--Đôi
(7, '2024-10-11', '2024-10-11 05:01:41', N'Đã kết thúc', 5, '', 17, 1),
--Nhóm
(8, '2024-10-12', '2024-10-12 05:12:32', N'Chưa diễn ra', 4, '', 19, 2),
(9, '2024-10-13', '2024-10-13 05:23:23', N'Đã kết thúc', 5, N'Sẽ quay lại', 19, 3),
--Phòng họp
(10, '2024-10-14', '2024-10-14 05:34:14', N'Đã kết thúc', 5, N'Tuyệt vời!', 22, 4);


--Insert into SlotBooking
INSERT INTO [SlotBooking] (SlotId, BookingId) VALUES

--Đơn
(1, 1),
(25, 2),
--Đôi
(6, 3),
--Nhóm
(8, 4),
--Phòng họp
(15, 5),

--Đơn
(14, 6),
--Đôi
(17, 7),
--Nhóm
(19, 8),
(43, 9),
--Phòng họp
(22, 10);


--Insert into Payment
INSERT INTO [Payment] (Id, Method, Amount, Date, Status, BookingId) VALUES
(1, N'Thanh toán qua VNPay', 120000, '2024-10-05', N'Đã thanh toán', 1),
(2, N'Thanh toán qua VNPay', 40000, '2024-10-05', N'Đã thanh toán', 1),
(3, N'Thanh toán qua VNPay', 80000, '2024-10-06', N'Đã thanh toán', 2),
(4, N'Thanh toán qua VNPay', 80000, '2024-10-07', N' Đã thanh toán', 3),
(5, N'Thanh toán qua VNPay', 110000, '2024-10-08', N'Chưa thanh toán', 4),
(6, N'Thanh toán qua VNPay', 10000, '2024-10-08', N'Chưa thanh toán', 4),
(7, N'Thanh toán qua VNPay', 240000, '2024-10-08', N'Chưa thanh toán', 4),
(8, N'Thanh toán qua VNPay', 40000, '2024-10-08', N'Chưa thanh toán', 4),
(9, N'Thanh toán qua VNPay', 60000, '2024-10-09', N'Đã thanh toán', 5),
(10, N'Thanh toán qua VNPay', 70000, '2024-10-10', N'Đã thanh toán', 6),
(11, N'Thanh toán qua VNPay', 90000, '2024-10-11', N'Đã thanh toán', 7),
(12, N'Thanh toán qua VNPay', 80000, '2024-10-11', N'Đã thanh toán', 7),
(13, N'Thanh toán qua VNPay', 20000, '2024-10-11', N'Đã thanh toán', 7),
(14, N'Thanh toán qua VNPay', 120000, '2024-10-12', N'Chưa thanh toán', 8),
(15, N'Thanh toán qua VNPay', 120000, '2024-10-13', N'Đã thanh toán', 9), 
(16, N'Thanh toán qua VNPay', 200000, '2024-10-14', N'Đã thanh toán', 10),
(17, N'Thanh toán qua VNPay', 100000, '2024-10-14', N'Đã thanh toán', 10),
(18, N'Thanh toán qua VNPay', 100000, '2024-10-14', N'Đã thanh toán', 10);


--Insert into Category
INSERT INTO [Category] (Id, Name, Status) VALUES
(1, N'Đồ ăn', N'Vẫn còn'),
(2, N'Đồ uống', N'Vẫn còn'),
(3, N'Đồ chơi', N'Vẫn còn');


--Insert into Product
INSERT INTO [Product] (Id, Name, Price, Description, Rating, Stock, StoreId, CategoryId) VALUES

--Store 1
(1, N'Bánh quy', 20000, N'Bánh quy giòn tan', 4, 56, 1, 1),
(2, N'Bánh bim bim', 10000, N'Các loại oishi ngon', 5, 80, 1, 1),
(3, N'Kẹo', 15000, N'Kẹo ngọt cho mọi người', 4, 300, 1, 1),
(4, N'Trái cây', 25000, N'Trái cây tươi mát', 4, 10, 1, 1),
(5, N'Burger', 60000, N'Burger thịt bò tươi ngon', 4, 150, 1, 1),
(6, N'Fries', 30000, N'Khoai tây chiên giòn', 4, 200, 1, 1),

(7, N'Nước lọc', 10000, N'Nước lọc tinh khiết', 5, 200, 1, 2),
(8, N'Nước ngọt', 20000, N'Nước ngọt có gas', 4, 300, 1, 2),
(9, N'Tea lạnh', 10000, N'Tea lạnh giải khát', 5, 150, 1, 2),
(10, N'Cà phê', 40000, N'Cà phê rang xay nguyên chất', 5, 120, 1, 2),
(11, N'Sinh tố', 40000, N'Sinh tố trái cây mát lạnh', 4, 90, 1, 2),
(12, N'Trà sữa', 40000, N'Trà sữa truyền thống', 5, 220, 1, 2),

(13, N'Cờ cá ngựa', 10000, N'Đua cờ cá ngựa', 5, 10, 1, 3),
(14, N'Cờ vua', 10000, N'Cờ vua chiến thuật', 5, 10, 1, 3),
(15, N'Bài UNO', 10000, N'Bài UNO đầy đủ chức năng', 5, 10, 1, 3),
(16, N'Bài ma sói', 10000, N'Đứa nào là sói?', 5, 10, 1, 3),
(17, N'Xếp gỗ', 10000, N'Xếp gỗ thành tháp', 5, 10, 1, 3),
(18, N'Detective Conan', 10000, N'Truyện tranh Conan', 4, 200, 1, 3),

--Store 2
(19, N'Bánh quy', 20000, N'Bánh quy giòn tan', 4, 100, 2, 1),
(20, N'Bánh bim bim', 10000, N'Các loại oishi ngon', 5, 80, 2, 1),
(21, N'Kẹo', 15000, N'Kẹo ngọt cho mọi người', 4, 300, 2, 1),
(22, N'Trái cây', 25000, N'Trái cây tươi mát', 4, 10, 2, 1),
(23, N'Burger', 60000, N'Burger thịt bò tươi ngon', 4, 150, 2, 1),
(24, N'Fries', 30000, N'Khoai tây chiên giòn', 4, 200, 2, 1),

(25, N'Nước lọc', 10000, N'Nước lọc tinh khiết', 5, 200, 2, 2),
(26, N'Nước ngọt', 20000, N'Nước ngọt có gas', 4, 300, 2, 2),
(27, N'Tea lạnh', 10000, N'Tea lạnh giải khát', 5, 150, 2, 2),
(28, N'Cà phê', 40000, N'Cà phê rang xay nguyên chất', 5, 120, 2, 2),
(29, N'Sinh tố', 40000, N'Sinh tố trái cây mát lạnh', 4, 90, 2, 2),
(30, N'Trà sữa', 40000, N'Trà sữa truyền thống', 5, 220, 2, 2),

(31, N'Cờ cá ngựa', 10000, N'Đua cờ cá ngựa', 5, 10, 2, 3),
(32, N'Cờ vua', 10000, N'Cờ vua chiến thuật', 5, 10, 2, 3),
(33, N'Bài UNO', 10000, N'Bài UNO đầy đủ chức năng', 5, 10, 2, 3),
(34, N'Bài ma sói', 10000, N'Đứa nào là sói?', 5, 10, 2, 3),
(35, N'Xếp gỗ', 10000, N'Xếp gỗ thành tháp', 5, 10, 2, 3),
(36, N'Detective Conan', 10000, N'Truyện tranh Conan', 4, 200, 2, 3);


--Insert into BookingOrder
INSERT INTO [BookingOrder] (Id, Amount, Quantity, Status, Date, BookingId, ProductId) VALUES

--Đơn
(1, 40000, 1, N'Đã thanh toán', '2024-10-05', 1, 11),  --Sinh tố

--Đôi
(2, 80000, 2, N'Đã thanh toán', '2024-10-11', 7, 28),  --Cà phê
(3, 20000, 1, N'Đã thanh toán', '2024-10-11', 7, 19),  --Bánh quy

--Nhóm
(4, 10000, 1, N'Chưa thanh toán', '2024-10-08', 4, 15),  --Bài UNO
(5, 240000, 6, N'Chưa thanh toán', '2024-10-08', 4, 12),  --Trà sữa
(6, 40000, 4, N'Chưa thanh toán', '2024-10-08', 4, 2),  --Bánh bim bim

--Phòng họp
(7, 100000, 5, N'Đã thanh toán', '2024-10-14', 10, 19),  --Bánh quy
(8, 100000, 10, N'Đã thanh toán', '2024-10-14', 10, 27);  --Tea lạnh
