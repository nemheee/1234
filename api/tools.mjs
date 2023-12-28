import dbTools from './db_tools.mjs';
import express from 'express';

class Tools {
  constructor() {
    this.tools = new Map();
    this.sessions = new Map();
  }

  async getTools(req, res) {
    try {
      const result = await dbTools.selectTools();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getTools:', error);
      res.status(500).send("Error occurred");
    }
  }
}

const tools = new Tools();
export { tools, express };