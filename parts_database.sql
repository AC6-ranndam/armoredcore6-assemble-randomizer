--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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

--
-- Name: parts; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA parts;


ALTER SCHEMA parts OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: partslist; Type: TABLE; Schema: parts; Owner: postgres
--

CREATE TABLE parts.partslist (
    name character varying(22),
    weight integer,
    en integer,
    right_wearable boolean
);


ALTER TABLE parts.partslist OWNER TO postgres;

--
-- Data for Name: partslist; Type: TABLE DATA; Schema: parts; Owner: postgres
--

COPY parts.partslist (name, weight, en, right_wearable) FROM stdin;
12345	56879	10123	f
\.


--
-- PostgreSQL database dump complete
--

