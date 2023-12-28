import pool from "./db.mjs";

class Tool {
  constructor() {}

  async selectTools() {
    try {
      const toolsData = await pool.query('SELECT * FROM tools');
      return toolsData.rows; // Assuming 'rows' contains the actual data
    } catch (error) {
      console.error('Error executing SQL query:', error.message);
      throw error;
    }
  }
}

const dbTools = new Tool();
export default dbTools;