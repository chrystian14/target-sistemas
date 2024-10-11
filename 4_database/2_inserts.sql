-- Populando as tabelas
INSERT INTO 
  "states" ("name", "code") 
VALUES 
  ('São Paulo', 'SP'), -- 1
  ('Rio de Janeiro', 'RJ'), -- 2
  ('Minas Gerais', 'MG'); -- 3

INSERT INTO 
  "phone_types" ("type_name") 
VALUES 
  ('Residential'), -- 1
  ('Commercial'), -- 2
  ('Cellular'); -- 3

INSERT INTO 
  "customers" ("business_name", "state_id") 
VALUES 
  ('Cliente A', 1), -- 1
  ('Cliente B', 2), -- 2
  ('Cliente C', 1), -- 3
  ('Cliente D', 3); -- 4

INSERT INTO 
  "phones" ("number", "phone_type_id", "customer_id") 
VALUES 
  ('1111-1111', 1, 1), -- 1
  ('2222-2222', 2, 1), -- 2
  ('3333-3333', 3, 2), -- 3
  ('4444-4444', 1, 3), -- 4
  ('5555-5555', 3, 4); -- 5
