'use strict';

//const U = require(`../util`);
//const POOL = require(`../collections/pool`);
//const List = require(`../collections/list`);
//const DisposableObjectEx = require(`../collections/disposable-object-ex`);
//const Catalog = require(`../collections/catalog`);

const { U } = require(`@nkm/utils`);
const { List } = require(`@nkm/collections`);
const { POOL, DisposableObjectEx } = require(`@nkm/common`);
const { Catalog } = require(`@nkm/data-core`);
const { CommandBox } = require(`@nkm/actions`);

const EcosystemCommand = require(`./data/commands/command-ecosystem`);

class EcosystemPart extends DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._commands = new CommandBox();

        this._ecosystem = null;
        this._catalog = new Catalog();
        this._catalog.expanded = true;

        this._metaTemplate = {
            note: ``,
            tags: [],
            export: {
                identifier: ``,
                deprecated: false
            },
            presentation: {
                color: `#7f7f7f`,
                weight: 0.25,
                order: 1,
                group: ``,
                catalogPath: ``
            },
            editors: {}
        }

    }

    get metaTemplate() { return this._metaTemplate; }
    set metaTemplate(p_value) {
        this._metaTemplate = p_value;
    }

    get ecosystem() { return this._ecosystem; }
    set ecosystem(p_value) {

        if (this._ecosystem === p_value) { return; }
        let oldValue = this._ecosystem;
        this._ecosystem = p_value;

        if (oldValue) {

        }

        if (p_value) {

        }

        this._OnEcosystemChanged(oldValue);

    }

    get catalog() { return this._catalog; }

    _OnEcosystemChanged(p_oldValue) {
        let list = this._commands.list;
        for (let i = 0; i < list.count; i++) {
            let cmd = list.At(i);
            if (U.isInstanceOf(cmd, EcosystemCommand)) { cmd.ecosystem = this._ecosystem; }
        }
    }

    _OnDataCreated(p_data) {
        p_data.ecosystem = this._ecosystem;
        p_data.metadata.Clone(this._metaTemplate);
    }

    _OnDataRegistered(p_data) {

    }

    _CleanUp() {
        this._ecosystem = null;
        super._CleanUp();
    }

}

module.exports = EcosystemPart;
