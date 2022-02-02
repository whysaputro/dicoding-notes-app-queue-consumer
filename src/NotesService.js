const { Pool } = require('pg');

class NotesService {
  constructor() {
    this._pool = new Pool();
  }

  async getNotesById(userId) {
    const query = {
      text: `SELECT notes.* FROM notes
                   LEFT JOIN collaborations c on notes.id = c.note_id
                   WHERE notes.owner = $1 OR c.user_id = $1
                   GROUP BY notes.id`,
      values: [userId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = NotesService;
