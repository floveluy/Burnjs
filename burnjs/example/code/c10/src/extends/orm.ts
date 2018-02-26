import { Sequelize } from 'sequelize';

export default (app: any) => {
    app.Sequelize = new Sequelize(...,....);
}