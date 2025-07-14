import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

export interface Consulta {
  id?: number;
  nombre: string;
  especialidad: string;
  fecha: string;
  hora: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada';
  tipo: 'pasada' | 'proxima';
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection | null = null;
  private isDbReady = false;

  constructor() {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    try {
      console.log('🗄️ Inicializando base de datos SQLite...');
      
      // Verificar si la plataforma soporta SQLite
      if (Capacitor.isNativePlatform()) {
        
        // Crear conexión a la base de datos
        this.db = await this.sqlite.createConnection(
          'miaplicacionsalud.db',
          false,
          'no-encryption',
          1,
          false
        );

        // Abrir la base de datos
        await this.db.open();

        // Crear tablas
        await this.createTables();

        // Insertar datos de ejemplo si no existen
        await this.insertSampleData();

        this.isDbReady = true;
        console.log('✅ Base de datos inicializada correctamente');
        
      } else {
        console.log('⚠️ SQLite no disponible en web, usando datos en memoria');
        this.isDbReady = false;
      }
    } catch (error) {
      console.error('❌ Error inicializando base de datos:', error);
      this.isDbReady = false;
    }
  }

  private async createTables() {
    const createConsultasTable = `
      CREATE TABLE IF NOT EXISTS consultas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        especialidad TEXT NOT NULL,
        fecha TEXT NOT NULL,
        hora TEXT NOT NULL,
        estado TEXT CHECK(estado IN ('pendiente', 'confirmada', 'cancelada')) NOT NULL,
        tipo TEXT CHECK(tipo IN ('pasada', 'proxima')) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;

    if (this.db) {
      await this.db.execute(createConsultasTable);
      console.log('📊 Tabla consultas creada');
    }
  }

  private async insertSampleData() {
    if (!this.db) return;

    // Verificar si ya hay datos
    const result = await this.db.query('SELECT COUNT(*) as count FROM consultas');
    const count = result.values?.[0]?.count || 0;

    if (count === 0) {
      console.log('🌱 Insertando datos de ejemplo...');

      // Datos de consultas pasadas
      const consultasPasadas: Omit<Consulta, 'id'>[] = [
        {
          nombre: 'Dra. Ana Pérez',
          especialidad: 'Cardiología',
          fecha: '2024-05-20',
          hora: '10:00',
          estado: 'confirmada' as const,
          tipo: 'pasada' as const
        },
        {
          nombre: 'Dr. Luis Gómez',
          especialidad: 'Dermatología',
          fecha: '2024-04-15',
          hora: '15:30',
          estado: 'confirmada' as const,
          tipo: 'pasada' as const
        },
        {
          nombre: 'Dra. Marta Ruiz',
          especialidad: 'Pediatría',
          fecha: '2024-03-10',
          hora: '09:00',
          estado: 'confirmada' as const,
          tipo: 'pasada' as const
        }
      ];

      // Datos de consultas próximas
      const consultasProximas: Omit<Consulta, 'id'>[] = [
        {
          nombre: 'Dra. Laura Sánchez',
          especialidad: 'Endocrinología',
          fecha: '2025-06-10',
          hora: '08:30',
          estado: 'pendiente' as const,
          tipo: 'proxima' as const
        },
        {
          nombre: 'Dr. Mario Vargas',
          especialidad: 'Traumatología',
          fecha: '2025-06-15',
          hora: '14:00',
          estado: 'pendiente' as const,
          tipo: 'proxima' as const
        },
        {
          nombre: 'Dra. Silvia Romero',
          especialidad: 'Reumatología',
          fecha: '2025-06-20',
          hora: '10:45',
          estado: 'confirmada' as const,
          tipo: 'proxima' as const
        }
      ];

      // Insertar todas las consultas
      const todasLasConsultas = [...consultasPasadas, ...consultasProximas];
      
      for (const consulta of todasLasConsultas) {
        await this.agregarConsulta(consulta);
      }

      console.log('✅ Datos de ejemplo insertados');
    }
  }

  // CRUD Operations

  async agregarConsulta(consulta: Omit<Consulta, 'id'>): Promise<number | null> {
    if (!this.isDbReady || !this.db) {
      console.log('⚠️ Base de datos no disponible');
      return null;
    }

    try {
      const sql = `
        INSERT INTO consultas (nombre, especialidad, fecha, hora, estado, tipo)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      
      const result = await this.db.run(sql, [
        consulta.nombre,
        consulta.especialidad,
        consulta.fecha,
        consulta.hora,
        consulta.estado,
        consulta.tipo
      ]);

      console.log('✅ Consulta agregada con ID:', result.changes?.lastId);
      return result.changes?.lastId || null;
    } catch (error) {
      console.error('❌ Error agregando consulta:', error);
      return null;
    }
  }

  async obtenerConsultas(tipo?: 'pasada' | 'proxima'): Promise<Consulta[]> {
    if (!this.isDbReady || !this.db) {
      console.log('⚠️ Base de datos no disponible, devolviendo datos de respaldo');
      return this.getDatosRespaldo(tipo);
    }

    try {
      let sql = 'SELECT * FROM consultas';
      let params: any[] = [];

      if (tipo) {
        sql += ' WHERE tipo = ?';
        params.push(tipo);
      }

      sql += ' ORDER BY fecha DESC, hora DESC';

      const result = await this.db.query(sql, params);
      return result.values || [];
    } catch (error) {
      console.error('❌ Error obteniendo consultas:', error);
      return this.getDatosRespaldo(tipo);
    }
  }

  async actualizarEstadoConsulta(id: number, estado: 'pendiente' | 'confirmada' | 'cancelada'): Promise<boolean> {
    if (!this.isDbReady || !this.db) {
      console.log('⚠️ Base de datos no disponible');
      return false;
    }

    try {
      const sql = 'UPDATE consultas SET estado = ? WHERE id = ?';
      const result = await this.db.run(sql, [estado, id]);
      
      console.log('✅ Estado de consulta actualizado');
      return (result.changes?.changes || 0) > 0;
    } catch (error) {
      console.error('❌ Error actualizando estado:', error);
      return false;
    }
  }

  async eliminarConsulta(id: number): Promise<boolean> {
    if (!this.isDbReady || !this.db) {
      console.log('⚠️ Base de datos no disponible');
      return false;
    }

    try {
      const sql = 'DELETE FROM consultas WHERE id = ?';
      const result = await this.db.run(sql, [id]);
      
      console.log('🗑️ Consulta eliminada');
      return (result.changes?.changes || 0) > 0;
    } catch (error) {
      console.error('❌ Error eliminando consulta:', error);
      return false;
    }
  }

  // Datos de respaldo para cuando SQLite no esté disponible (web)
  private getDatosRespaldo(tipo?: 'pasada' | 'proxima'): Consulta[] {
    const consultasPasadas: Consulta[] = [
      { id: 1, nombre: 'Dra. Ana Pérez', especialidad: 'Cardiología', fecha: '2024-05-20', hora: '10:00', estado: 'confirmada', tipo: 'pasada' },
      { id: 2, nombre: 'Dr. Luis Gómez', especialidad: 'Dermatología', fecha: '2024-04-15', hora: '15:30', estado: 'confirmada', tipo: 'pasada' },
      { id: 3, nombre: 'Dra. Marta Ruiz', especialidad: 'Pediatría', fecha: '2024-03-10', hora: '09:00', estado: 'confirmada', tipo: 'pasada' }
    ];

    const consultasProximas: Consulta[] = [
      { id: 4, nombre: 'Dra. Laura Sánchez', especialidad: 'Endocrinología', fecha: '2025-06-10', hora: '08:30', estado: 'pendiente', tipo: 'proxima' },
      { id: 5, nombre: 'Dr. Mario Vargas', especialidad: 'Traumatología', fecha: '2025-06-15', hora: '14:00', estado: 'pendiente', tipo: 'proxima' },
      { id: 6, nombre: 'Dra. Silvia Romero', especialidad: 'Reumatología', fecha: '2025-06-20', hora: '10:45', estado: 'confirmada', tipo: 'proxima' }
    ];

    if (tipo === 'pasada') return consultasPasadas;
    if (tipo === 'proxima') return consultasProximas;
    return [...consultasPasadas, ...consultasProximas];
  }

  // Verificar si la base de datos está lista
  isDatabaseReady(): boolean {
    return this.isDbReady;
  }

  // Cerrar conexión (para cleanup)
  async closeDatabase() {
    if (this.db) {
      await this.db.close();
      console.log('🔒 Base de datos cerrada');
    }
  }
}
