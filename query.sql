
INSERT INTO public.users (active,email,"password","role",username) VALUES
	 (false,'bataa@gmail.com','$2a$10$ccTit8sv9cid/tXGFqrxd.lPMZ74s0I2vrh0cC5H9KcgKsArv1LDK','USER','bataa'),
	 (false,'turbold@gmail.com','$2a$10$VYzkJXCnPjIWnyYyCVx8GeqT/uM1jKHxsSB/CrTcFGGSsjTVadiIm','ADMIN','turbold'),
	 (false,'dorjoo@gmail.com','$2a$10$fXbdxvOAB6P.MUewMuBzs.kn01PMjm67OflGRQ2hqtX6hzeFhlVBS','USER','turbold');

	
INSERT INTO public.fiber_type ("name",name_en) VALUES
	 ('Торго','Silk'),
	 ('Ноос','Wool'),
	 ('Хөвөн','Cotton'),
	 ('Ноолуур','Cashmere');

INSERT INTO public.fiber_material ("name",name_en) VALUES
	 ('Түүхий эд','Fiber'),
	 ('Хольсон түүхий эд','Fiber Blended'),
	 ('Цувимал','Roven'),
	 ('Дан утас','Single Yarn'),
	 ('Ороосон утас','Winded Yarn'),
	 ('Давхарласан утас','Doubled Yarn'),
	 ('Эрчилсэн утас','Twisted Yarn');

INSERT INTO public.fiber_color ("name",name_en) VALUES
	 ('Цэнхэр','Blue'),
	 ('Шар','Yellow'),
	 ('Ногоон','Green'),
	 ('Саарал','Grey'),
	 ('Улаан','Red'),
	 ('Цагаан','White');

INSERT INTO public.factory_process (description,"name",name_en,outputs,outputs_en,inputs,inputs_en,waste) VALUES
	 ('Түүхий эдийг будах','Будах','Dyeing','Будсан түүхий эд','Dyed Fiber','Түүхий эд','Fiber',NULL),
	 ('Түүхий эдийг холих','Холих','Blending','Хольсон түүхий эд','Fiber Blended','Будсан түүхий эд, Хольсон түүхий эд, Цувимал','Dyed Fiber, Fiber Blended, Roven',NULL),
	 ('Хольсон түүхий эдийг цувих','Цувих','Carding','Цувимал','Roven','Хольсон түүхий эд, Цувимал','Fiber Blended, Roven','Цэвэр очёс, Бохир очёс'),
	 ('Цувьсан түүхий эдийг дан утас болгох','Ээрэх','Spinning','Дан утас','Single Yarn','Цувимал, Хольсон түүхий эд','Roven, Fiber Blended','Цувимал, Эрчтэй үзүүр'),
	 ('Дан утсын ороох','Ороох','Winding','Ороосон утас','Winded Yarn','Дан утас','Single Yarn','Эрчтэй үзүүр'),
	 ('Ороосон утсыг давхарлах','Давхарлах','Doubling','Давхар утас','Doubled Yarn','Ороосон утас','Winded Yarn','Эрчтэй үзүүр'),
	 ('Давхарласан утсыг бэлэн болгох','Мушгих','Twisting','Мушгисан утас','Twisted Yarn','Давхар утас','Doubled Yarn','Эрчтэй үзүүр');

INSERT INTO public.customer (address,email,fax,"name",phone_number) VALUES
	 ('BGD','turbold1125@gmailcom','12345678','turuu','80232321'),
	 ('Mongolia, Ulaanbaatar,Bayangol','bataa@gmail.com','2321','bataa','80232322'),
	 ('Mongolia, Ulaanbaatar,Bayangol','dorjoo@gmail.com','2321','dorjoo','80232324');

