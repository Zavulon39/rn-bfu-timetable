import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('favorite.db')

export class favoriteDB {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `
          CREATE TABLE IF NOT EXISTS favorite (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            data TEXT NOT NULL
          )
          `,
          [],
          resolve,
          (_, error) => reject(error)
        )
      })
    })
  }

  static getFavorite() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM favorite`,
          [],
          (_, res) => resolve(res.rows._array),
          (_, error) => reject(error)
        )
      })
    })
  }

  static add(group) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO favorite (data) VALUES (?)`,
          [group],
          (_, res) => resolve(res.insertId),
          (_, error) => reject(error)
        )
      })
    })
  }

  static del(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `DELETE FROM favorite WHERE id = ?`,
          [id],
          resolve,
          (_, error) => reject(error)
        )
      })
    })
  }
}
