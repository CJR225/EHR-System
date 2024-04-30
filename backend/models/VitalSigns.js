const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('VitalSigns', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Patients',
                key: 'id'
            }
        },
        temperature: {
            type: DataTypes.DECIMAL(10, 2)
        },
        heart_rate: {
            type: DataTypes.INTEGER
        },
        bps: {
            type: DataTypes.STRING
        },
        bpd: {
            type: DataTypes.STRING
        },
        blood_oxygen: {
            type: DataTypes.DECIMAL(10, 2)
        },
        resting_respiratory: {
            type: DataTypes.INTEGER
        },
        pain: {
            type: DataTypes.INTEGER
        },
        recorded_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'VitalSigns',
        timestamps: false
    });
    
};
