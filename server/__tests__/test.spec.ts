import supertest from "supertest";
import { app, pool } from "../server";

let id = "";
describe("Pogs API Testing", () => {
  beforeEach(async () => {
    const response = await pool.query(`
        INSERT INTO pogs (name, ticker_symbol, price, color)
        VALUES 
        ('blue eyes white dragon', 'BEWD', '9929', 'cyan')
        RETURNING id
        `);
    id = response.rows[0].id;
    console.log("supposedly the id", response.rows[0].id);
    pool.end();
  });
  afterEach(async () => {
    const response = await pool.query(`
    DELETE FROM pogs 
    WHERE name = 'blue eyes white dragon';
    `);
    pool.end();
  });

  describe("Fetch all pogs", () => {
    it("Should fetch all pogs", async () => {
      const response = await supertest(app).get("/api/pogs");

      expect(response.statusCode).toBe(200);
    });

    describe("Fetch pog through id", () => {
      it("Should fetch pog through id", async () => {
        const response = await supertest(app).get(`/api/pogs/${id}`);
      });
    });
  });
});
