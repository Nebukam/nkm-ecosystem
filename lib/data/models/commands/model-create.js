'use strict';

const { U } = require(`@nkm/utils`);
const { ID } = require(`@nkm/data-core`);
const { ACTION_REQUEST, Request } = require(`@nkm/actions`);

const DataManipulationCommand = require(`../../commands/command-data`);


class ModelCreate extends DataManipulationCommand {
    constructor() { super(); this._dataClass = require(`../model`); }

    _Init() {
        super._Init();
        //this._name = `Create Model`;
    }

    _InternalExecute() {

        let tempModel = this._ecosystem.models.CreateTemp(),
            tempID = new ID(),
            name = `NewModel${U.unsafeUID}`;

        //Make sure we don't push a duplicate id
        while (this._ecosystem.models.Get(name)) {
            name = `NewModel${U.unsafeUID}`;
        }

        tempID.name = name;
        tempModel.id = tempID;
        tempModel.Dirty();

        let options = {
            data: tempModel
        };

        Request.Emit(ACTION_REQUEST.CREATE,
            options, this,
            this._OnRequestSuccess,
            this._OnRequestFail);

    }

    _OnRequestFail(p_request) {
        p_request.options.data.Release();
        this._Fail(`Model creation request has not been handled. Reason : ${p_request.failReason}`);
    }

    _OnRequestSuccess(p_request) { this._Success(); }

}

module.exports = ModelCreate;
