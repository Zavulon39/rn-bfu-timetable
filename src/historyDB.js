import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('history.db')

export class historyDB {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `
          CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            data TEXT UNIQUE NOT NULL
          )
          `,
          [],
          resolve,
          (_, error) => reject(error)
        )
      })
    })
  }

  static getHistory() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM history`,
          [],
          (_, res) => resolve(res.rows._array),
          (_, error) => reject(error)
        )
      })
    })
  }

  static add(item) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO history (data) VALUES (?)`,
          [item],
          (_, res) => resolve(res.insertId),
          (_, error) => reject(error)
        )
      })
    })
  }

  static clear() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `
          DELETE FROM history
          `,
          [],
          resolve,
          (_, error) => reject(error)
        )
      })
    })
  }
}
