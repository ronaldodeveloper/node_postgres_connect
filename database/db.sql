create table farmacia(
   id serial primary key,
	nome varchar(255) not null,
	marca varchar(255) not null,
	referencia boolean not null,
	quant integer not null
)