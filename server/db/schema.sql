SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: pog_values; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pog_values (
    id integer NOT NULL,
    pog_id integer,
    value numeric(10,2) NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    prev_value numeric(10,2)
);


--
-- Name: pog_values_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pog_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pog_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pog_values_id_seq OWNED BY public.pog_values.id;


--
-- Name: pogs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pogs (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    ticker_symbol character varying(10) NOT NULL,
    price numeric(10,2) NOT NULL,
    color character varying(30) NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: pogs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pogs_id_seq OWNED BY public.pogs.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(128) NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    sub_id character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    balance numeric(10,2)
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: pog_values id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pog_values ALTER COLUMN id SET DEFAULT nextval('public.pog_values_id_seq'::regclass);


--
-- Name: pogs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pogs ALTER COLUMN id SET DEFAULT nextval('public.pogs_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: pog_values pog_values_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pog_values
    ADD CONSTRAINT pog_values_pkey PRIMARY KEY (id);


--
-- Name: pogs pogs_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pogs
    ADD CONSTRAINT pogs_name_key UNIQUE (name);


--
-- Name: pogs pogs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pogs
    ADD CONSTRAINT pogs_pkey PRIMARY KEY (id);


--
-- Name: pogs pogs_ticker_symbol_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pogs
    ADD CONSTRAINT pogs_ticker_symbol_key UNIQUE (ticker_symbol);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_sub_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_sub_id_key UNIQUE (sub_id);


--
-- Name: pog_values pog_values_pog_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pog_values
    ADD CONSTRAINT pog_values_pog_id_fkey FOREIGN KEY (pog_id) REFERENCES public.pogs(id);


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20240309070929'),
    ('20240309132452'),
    ('20240417123440'),
    ('20240421042807'),
    ('20240424150944');
