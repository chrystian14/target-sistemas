/*
 Selecionando código, razão social e o(s) telefone(s) de todos os clientes do 
 estado de São Paulo (código “SP”);
*/ 
SELECT 
	s.code AS state_code,
    c.business_name,
    p.number
FROM 
    "customers" c
JOIN 
    "phones" p ON c.id = p.customer_id
JOIN 
    "states" s ON c.state_id = s.id
WHERE 
    s.code = 'SP';