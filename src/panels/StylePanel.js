import CommandGroupCmd from '../commands/CommandGroupCmd';
import SetValueCmd from '../commands/SetValueCmd';
import Style from '../data/Style';
import * as utils from '../utils';

/**
 * Panel to edit all style properties.
 * @class
 */
export default class StylePanel {
    constructor(rootElement, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
        this.selectedObjId = null;
    }

    render(data) {
        let panel = $('<div id="rbro_style_panel" class="rbroHidden"></div>');
        let elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_style_name">${this.rb.getLabel('styleName')}:</label>`);
        let elFormField = $('<div class="rbroFormField"></div>');
        let elStyleName = $(`<input id="rbro_style_name">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    if (elStyleName.val().trim() !== '') {
                        let cmd = new SetValueCmd(this.selectedObjId, 'rbro_style_name', 'name',
                            elStyleName.val(), SetValueCmd.type.text, this.rb);
                    } else {
                        elStyleName.val(style.getName());
                    }
                }
            });
        elFormField.append(elStyleName);
        elDiv.append(elFormField);
        panel.append(elDiv);

        StylePanel.renderStyle(panel, 'style_', '', this.rb);

        $('#rbro_detail_panel').append(panel);
    }

    static renderStyle(elPanel, idPrefix, fieldPrefix, rb) {
        let elDiv, elFormField;
        elDiv = $(`<div id="rbro_${idPrefix}textstyle_row" class="rbroFormRow"></div>`);
        elDiv.append(`<label>${rb.getLabel('styleTextStyle')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elTextStyle = $(`<div id="rbro_${idPrefix}textstyle"></div>`);
        let elBold = $(
            `<button id="rbro_${idPrefix}bold" name="style_bold"
             class="rbroButton rbroActionButton rbroIcon-bold" type="button"
             title="${rb.getLabel('styleBold')}"></button>`)
            .click(event => {
                let val = !elBold.hasClass('rbroButtonActive');
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}bold`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}bold`,
                            `${fieldPrefix}bold`, val, SetValueCmd.type.button, rb));
                    }
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elTextStyle.append(elBold);
        let elItalic = $(
            `<button id="rbro_${idPrefix}italic"
             class="rbroButton rbroActionButton rbroIcon-italic" type="button"
             title="${rb.getLabel('styleItalic')}"></button>`)
            .click(event => {
                let val = !elItalic.hasClass('rbroButtonActive');
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}italic`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}italic`,
                            `${fieldPrefix}italic`, val, SetValueCmd.type.button, rb));
                    }
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elTextStyle.append(elItalic);
        let elUnderline = $(
            `<button id="rbro_${idPrefix}underline"
             class="rbroButton rbroActionButton rbroIcon-underline" type="button"
             title="${rb.getLabel('styleUnderline')}"></button>`)
            .click(event => {
                let val = !elUnderline.hasClass('rbroButtonActive');
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}underline`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}underline`,
                            `${fieldPrefix}underline`, val, SetValueCmd.type.button, rb));
                    }
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elTextStyle.append(elUnderline);
        let elStrikethrough = $(
            `<button id="rbro_${idPrefix}strikethrough"
             class="rbroButton rbroActionButton rbroIcon-strikethrough" type="button"
             title="${rb.getLabel('styleStrikethrough')}"></button>`)
            .click(event => {
                let val = !elStrikethrough.hasClass('rbroButtonActive');
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}strikethrough`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}strikethrough`,
                            `${fieldPrefix}strikethrough`, val, SetValueCmd.type.button, rb));
                    }
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elTextStyle.append(elStrikethrough);
        elFormField.append(elTextStyle);
        elDiv.append(elFormField);
        elPanel.append(elDiv);

        elDiv = $(`<div id="rbro_${idPrefix}alignment_row" class="rbroFormRow"></div>`);
        elDiv.append(`<label>${rb.getLabel('styleAlignment')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elHAlignment = $(`<div id="rbro_${idPrefix}halignment"></div>`);
        let elHAlignmentLeft = $(
            `<button id="rbro_${idPrefix}halignment_left"
             class="rbroButton rbroActionButton rbroIcon-text-align-left" type="button" value="left"
             title="${rb.getLabel('styleHAlignmentLeft')}"></button>`)
            .click(event => {
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    cmdGroup.addCommand(new SetValueCmd(
                        obj.getId(), `rbro_${idPrefix}halignment`,
                        `${fieldPrefix}horizontalAlignment`, Style.alignment.left,
                        SetValueCmd.type.buttonGroup, rb));
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elHAlignment.append(elHAlignmentLeft);
        let elHAlignmentCenter = $(
            `<button id="rbro_${idPrefix}halignment_center"
             class="rbroButton rbroActionButton rbroIcon-text-align-center" type="button" value="center"
             title="${rb.getLabel('styleHAlignmentCenter')}"></button>`)
            .click(event => {
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    cmdGroup.addCommand(new SetValueCmd(
                        obj.getId(), `rbro_${idPrefix}halignment`,
                        `${fieldPrefix}horizontalAlignment`, Style.alignment.center,
                        SetValueCmd.type.buttonGroup, rb));
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elHAlignment.append(elHAlignmentCenter);
        let elHAlignmentRight = $(
            `<button id="rbro_${idPrefix}halignment_right"
             class="rbroButton rbroActionButton rbroIcon-text-align-right" type="button" value="right"
             title="${rb.getLabel('styleHAlignmentRight')}"></button>`)
            .click(event => {
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    cmdGroup.addCommand(new SetValueCmd(
                        obj.getId(), `rbro_${idPrefix}halignment`,
                        `${fieldPrefix}horizontalAlignment`, Style.alignment.right,
                        SetValueCmd.type.buttonGroup, rb));
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elHAlignment.append(elHAlignmentRight);
        let elHAlignmentJustify = $(
            `<button id="rbro_${idPrefix}halignment_justify"
             class="rbroButton rbroActionButton rbroIcon-text-align-justify" type="button" value="justify"
             title="${rb.getLabel('styleHAlignmentJustify')}"></button>`)
            .click(event => {
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    cmdGroup.addCommand(new SetValueCmd(obj.getId(), `rbro_${idPrefix}halignment`,
                        `${fieldPrefix}horizontalAlignment`, Style.alignment.justify,
                        SetValueCmd.type.buttonGroup, rb));
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elHAlignment.append(elHAlignmentJustify);
        elFormField.append(elHAlignment);

        let elVAlignment = $(`<div id="rbro_${idPrefix}valignment"></div>`);
        let elVAlignmentTop = $(
            `<button id="rbro_${idPrefix}valignment_top"
             class="rbroButton rbroActionButton rbroIcon-align-top" type="button" value="top"
             title="${rb.getLabel('styleVAlignmentTop')}"></button>`)
            .click(event => {
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    cmdGroup.addCommand(new SetValueCmd(
                        obj.getId(), `rbro_${idPrefix}valignment`,
                        `${fieldPrefix}verticalAlignment`, Style.alignment.top,
                        SetValueCmd.type.buttonGroup, rb));
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elVAlignment.append(elVAlignmentTop);
        let elVAlignmentMiddle = $(
            `<button id="rbro_${idPrefix}valignment_middle"
             class="rbroButton rbroActionButton rbroIcon-align-middle" type="button" value="middle"
             title="${rb.getLabel('styleVAlignmentMiddle')}"></button>`)
            .click(event => {
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    cmdGroup.addCommand(new SetValueCmd(
                        obj.getId(), `rbro_${idPrefix}valignment`,
                        `${fieldPrefix}verticalAlignment`, Style.alignment.middle,
                        SetValueCmd.type.buttonGroup, rb));
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elVAlignment.append(elVAlignmentMiddle);
        let elVAlignmentBottom = $(
            `<button id="rbro_${idPrefix}valignment_bottom"
             class="rbroButton rbroActionButton rbroIcon-align-bottom" type="button" value="bottom"
             title="${rb.getLabel('styleVAlignmentBottom')}"></button>`)
            .click(event => {
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    cmdGroup.addCommand(new SetValueCmd(
                        obj.getId(), `rbro_${idPrefix}valignment`,
                        `${fieldPrefix}verticalAlignment`, Style.alignment.bottom,
                        SetValueCmd.type.buttonGroup, rb));
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elVAlignment.append(elVAlignmentBottom);
        elFormField.append(elVAlignment);
        elDiv.append(elFormField);
        elPanel.append(elDiv);

        elDiv = $(`<div id="rbro_${idPrefix}text_color_row" class="rbroFormRow"></div>`);
        elDiv.append(`<label for="rbro_${idPrefix}text_color">${rb.getLabel('styleTextColor')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elTextColorContainer = $('<div class="rbroColorPickerContainer"></div>');
        let elTextColor = $(`<input id="rbro_${idPrefix}text_color">`)
            .change(event => {
                let val = elTextColor.val();
                if (utils.isValidColor(val)) {
                    let cmdGroup = new CommandGroupCmd('Set value', rb);
                    let selectedObjects = rb.getSelectedObjects();
                    for (let obj of selectedObjects) {
                        if (obj.getValue(`${fieldPrefix}textColor`) !== val) {
                            cmdGroup.addCommand(new SetValueCmd(
                                obj.getId(), `rbro_${idPrefix}text_color`,
                                `${fieldPrefix}textColor`, val, SetValueCmd.type.color, rb));
                        }
                    }
                    if (!cmdGroup.isEmpty()) {
                        rb.executeCommand(cmdGroup);
                    }
                }
            });
        elTextColorContainer.append(elTextColor);
        elFormField.append(elTextColorContainer);
        elDiv.append(elFormField);
        elPanel.append(elDiv);
        utils.initColorPicker(elTextColor, rb);

        elDiv = $(`<div id="rbro_${idPrefix}background_color_row" class="rbroFormRow"></div>`);
        elDiv.append(`<label for="rbro_${idPrefix}background_color">
                      ${rb.getLabel('styleBackgroundColor')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elBgColorContainer = $('<div class="rbroColorPickerContainer"></div>');
        let elBgColor = $(`<input id="rbro_${idPrefix}background_color">`)
            .change(event => {
                let val = elBgColor.val();
                if (utils.isValidColor(val)) {
                    let cmdGroup = new CommandGroupCmd('Set value', rb);
                    let selectedObjects = rb.getSelectedObjects();
                    for (let obj of selectedObjects) {
                        if (obj.getValue(`${fieldPrefix}backgroundColor`) !== val) {
                            cmdGroup.addCommand(new SetValueCmd(
                                obj.getId(), `rbro_${idPrefix}background_color`,
                                `${fieldPrefix}backgroundColor`, val, SetValueCmd.type.color, rb));
                        }
                    }
                    if (!cmdGroup.isEmpty()) {
                        rb.executeCommand(cmdGroup);
                    }
                }
            });
        elBgColorContainer.append(elBgColor);
        elFormField.append(elBgColorContainer);
        elDiv.append(elFormField);
        elPanel.append(elDiv);
        utils.initColorPicker(elBgColor, rb, { allowEmpty: true });

        elDiv = $(`<div id="rbro_${idPrefix}alternate_background_color_row" class="rbroFormRow"></div>`);
        elDiv.append(`<label for="rbro_${idPrefix}alternate_background_color">
                      ${rb.getLabel('tableElementAlternateBackgroundColor')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elAlternateBgColorContainer = $('<div class="rbroColorPickerContainer"></div>');
        let elAlternateBgColor = $(`<input id="rbro_${idPrefix}alternate_background_color">`)
            .change(event => {
                let val = elAlternateBgColor.val();
                if (utils.isValidColor(val)) {
                    let cmdGroup = new CommandGroupCmd('Set value', rb);
                    let selectedObjects = rb.getSelectedObjects();
                    for (let obj of selectedObjects) {
                        if (obj.getValue(`${fieldPrefix}alternateBackgroundColor`) !== val) {
                            cmdGroup.addCommand(new SetValueCmd(
                                obj.getId(), `rbro_${idPrefix}alternate_background_color`,
                                `${fieldPrefix}alternateBackgroundColor`, val, SetValueCmd.type.color, rb));
                        }
                    }
                    if (!cmdGroup.isEmpty()) {
                        rb.executeCommand(cmdGroup);
                    }
                }
            });
        elAlternateBgColorContainer.append(elAlternateBgColor);
        elFormField.append(elAlternateBgColorContainer);
        elDiv.append(elFormField);
        elPanel.append(elDiv);
        utils.initColorPicker(elAlternateBgColor, rb, { allowEmpty: true });

        elDiv = $(`<div id="rbro_${idPrefix}font_row" class="rbroFormRow"></div>`);
        elDiv.append(`<label for="rbro_${idPrefix}font">${rb.getLabel('styleFont')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit rbroSelectFont"></div>');
        let strFont = `<select id="rbro_${idPrefix}font">`;
        for (let font of rb.getFonts()) {
            strFont += `<option value="${font.value}">${font.name}</option>`;
        }
        strFont += '</select>';
        let elFont = $(strFont)
            .change(event => {
                let val = elFont.val();
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}font`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}font`,
                            `${fieldPrefix}font`, val, SetValueCmd.type.select, rb));
                    }
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elFormField.append(elFont);
        let strFontSize = `<select id="rbro_${idPrefix}font_size">`;
        for (let size of [8,9,10,11,12,13,14,15,16,18,20,22,24,26,28,32,36,40,44,48,54,60,66,72,80]) {
            strFontSize += `<option value="${size}">${size}</option>`;
        }
        strFontSize += '</select>';
        let elFontSize = $(strFontSize)
            .change(event => {
                let val = elFontSize.val();
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}fontSize`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}font_size`,
                            `${fieldPrefix}fontSize`, val, SetValueCmd.type.select, rb));
                    }
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elFormField.append(elFontSize);
        elFormField.append(`<span>${rb.getLabel('styleFontSizeUnit')}</span>`);
        elDiv.append(elFormField);
        elPanel.append(elDiv);

        elDiv = $(`<div id="rbro_${idPrefix}line_spacing_row" class="rbroFormRow"></div>`);
        elDiv.append(`<label for="rbro_${idPrefix}line_spacing">
                      ${rb.getLabel('styleLineSpacing')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elLineSpacing = $(`<select id="rbro_${idPrefix}line_spacing">
                <option value="1">1</option>
                <option value="1.1">1.1</option>
                <option value="1.2">1.2</option>
                <option value="1.3">1.3</option>
                <option value="1.4">1.4</option>
                <option value="1.5">1.5</option>
                <option value="1.6">1.6</option>
                <option value="1.7">1.7</option>
                <option value="1.8">1.8</option>
                <option value="1.9">1.9</option>
                <option value="2">2</option>
            </select>`)
            .change(event => {
                let val = elLineSpacing.val();
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}lineSpacing`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}line_spacing`,
                            `${fieldPrefix}lineSpacing`, val, SetValueCmd.type.select, rb));
                    }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
                }
            });
        elFormField.append(elLineSpacing);
        elDiv.append(elFormField);
        elPanel.append(elDiv);

        let elBorderDiv = $(`<div id="rbro_${idPrefix}border_div"></div>`);
        elDiv = $(`<div id="rbro_${idPrefix}border_row" class="rbroFormRow"></div>`);
        elDiv.append(`<label>${rb.getLabel('styleBorder')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elBorderStyle = $(`<div id="rbro_${idPrefix}border"></div>`);
        let elBorderAll = $(
            `<button id="rbro_${idPrefix}border_all"
             class="rbroButton rbroActionButton rbroIcon-border-all"
             type="button" value="${fieldPrefix}borderAll" title="${rb.getLabel('styleBorderAll')}"></button>`)
            .click(event => {
                let val = !elBorderAll.hasClass('rbroButtonActive');
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}borderAll`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}border_all`,
                            `${fieldPrefix}borderAll`, val, SetValueCmd.type.button, rb));
                    }
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elBorderStyle.append(elBorderAll);
        let elBorderLeft = $(
            `<button id="rbro_${idPrefix}border_left"
             class="rbroButton rbroActionButton rbroIcon-border-left"
             type="button" value="${fieldPrefix}borderLeft" title="${rb.getLabel('orientationLeft')}"></button>`)
            .click(event => {
                let val = !elBorderLeft.hasClass('rbroButtonActive');
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}borderLeft`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}border_left`,
                            `${fieldPrefix}borderLeft`, val, SetValueCmd.type.button, rb));
                    }
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elBorderStyle.append(elBorderLeft);
        let elBorderTop = $(
            `<button id="rbro_${idPrefix}border_top"
             class="rbroButton rbroActionButton rbroIcon-border-top"
             type="button" value="${fieldPrefix}borderTop" title="${rb.getLabel('orientationTop')}"></button>`)
            .click(event => {
                let val = !elBorderTop.hasClass('rbroButtonActive');
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}borderTop`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}border_top`,
                            `${fieldPrefix}borderTop`, val, SetValueCmd.type.button, rb));
                    }
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elBorderStyle.append(elBorderTop);
        let elBorderRight = $(
            `<button id="rbro_${idPrefix}border_right"
             class="rbroButton rbroActionButton rbroIcon-border-right"
             type="button" value="${fieldPrefix}borderRight" title="${rb.getLabel('orientationRight')}"></button>`)
            .click(event => {
                let val = !elBorderRight.hasClass('rbroButtonActive');
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}borderRight`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}border_right`,
                            `${fieldPrefix}borderRight`, val, SetValueCmd.type.button, rb));
                    }
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elBorderStyle.append(elBorderRight);
        let elBorderBottom = $(
            `<button id="rbro_${idPrefix}border_bottom"
             class="rbroButton rbroActionButton rbroIcon-border-bottom"
             type="button" value="${fieldPrefix}borderBottom"
             title="${rb.getLabel('orientationBottom')}"></button>`)
            .click(event => {
                let val = !elBorderBottom.hasClass('rbroButtonActive');
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}borderBottom`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}border_bottom`,
                            `${fieldPrefix}borderBottom`, !elBorderBottom.hasClass('rbroButtonActive'),
                            SetValueCmd.type.button, rb));
                    }
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elBorderStyle.append(elBorderBottom);
        elFormField.append(elBorderStyle);
        elDiv.append(elFormField);
        elBorderDiv.append(elDiv);

        elDiv = $(`<div id="rbro_${idPrefix}border_color_row" class="rbroFormRow"></div>`);
        elDiv.append(`<label for="rbro_${idPrefix}border_color">
                      ${rb.getLabel('styleBorderColor')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elBorderColorContainer = $('<div class="rbroColorPickerContainer"></div>');
        let elBorderColor = $(`<input id="rbro_${idPrefix}border_color">`)
            .change(event => {
                let val = elBorderColor.val();
                if (utils.isValidColor(val)) {
                    let cmdGroup = new CommandGroupCmd('Set value', rb);
                    let selectedObjects = rb.getSelectedObjects();
                    for (let obj of selectedObjects) {
                        if (obj.getValue(`${fieldPrefix}borderColor`) !== val) {
                            cmdGroup.addCommand(new SetValueCmd(
                                obj.getId(), `rbro_${idPrefix}border_color`,
                                `${fieldPrefix}borderColor`, val, SetValueCmd.type.color, rb));
                        }
                    }
                    if (!cmdGroup.isEmpty()) {
                        rb.executeCommand(cmdGroup);
                    }
                }
            });
        elBorderColorContainer.append(elBorderColor);
        elFormField.append(elBorderColorContainer);
        elDiv.append(elFormField);
        elBorderDiv.append(elDiv);
        utils.initColorPicker(elBorderColor, rb);

        elDiv = $(`<div id="rbro_${idPrefix}border_width_row" class="rbroFormRow"></div>`);
        elDiv.append(
            `<label for="rbro_${idPrefix}border_width">${rb.getLabel('styleBorderWidth')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elBorderWidth = $(`<input id="rbro_${idPrefix}border_width">`)
            .on('input', event => {
                let val = elBorderWidth.val();
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}borderWidth`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}border_width`,
                            `${fieldPrefix}borderWidth`, val, SetValueCmd.type.text, rb));
                    }
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        elFormField.append(elBorderWidth);
        elDiv.append(elFormField);
        elBorderDiv.append(elDiv);
        utils.setInputDecimal(elBorderWidth);
        elPanel.append(elBorderDiv);


        elDiv = $(`<div id="rbro_${idPrefix}padding_row" class="rbroFormRow"></div>`);
        elDiv.append(`<label for="rbro_${idPrefix}padding">${rb.getLabel('stylePadding')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSmallInput"></div>');

        let elPaddingTopDiv = $('<div class="rbroColumnCenter"></div>');
        let elPaddingTop = $(
            `<input id="rbro_${idPrefix}padding_top" placeholder="${rb.getLabel('orientationTop')}">`)
            .on('input', event => {
                let val = elPaddingTop.val();
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}paddingTop`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}padding_top`,
                            `${fieldPrefix}paddingTop`, val, SetValueCmd.type.text, rb));
                    }
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        utils.setInputPositiveInteger(elPaddingTop);
        elPaddingTopDiv.append(elPaddingTop);
        elFormField.append(elPaddingTopDiv);

        let elDiv2 = $('<div class="rbroSplit"></div>');
        let elPaddingLeft = $(
            `<input id="rbro_${idPrefix}padding_left" placeholder="${rb.getLabel('orientationLeft')}">`)
            .on('input', event => {
                let val = elPaddingLeft.val();
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}paddingLeft`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}padding_left`,
                            `${fieldPrefix}paddingLeft`, val, SetValueCmd.type.text, rb));
                    }
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        utils.setInputPositiveInteger(elPaddingLeft);
        elDiv2.append(elPaddingLeft);
        let elPaddingRight = $(
            `<input id="rbro_${idPrefix}padding_right" placeholder="${rb.getLabel('orientationRight')}">`)
            .on('input', event => {
                let val = elPaddingRight.val();
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}paddingRight`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}padding_right`,
                            `${fieldPrefix}paddingRight`, val, SetValueCmd.type.text, rb));
                    }
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        utils.setInputPositiveInteger(elPaddingRight);
        elDiv2.append(elPaddingRight);
        elFormField.append(elDiv2);

        let elPaddingBottomDiv = $('<div class="rbroColumnCenter"></div>');
        let elPaddingBottom = $(
            `<input id="rbro_${idPrefix}padding_bottom" placeholder="${rb.getLabel('orientationBottom')}">`)
            .on('input', event => {
                let val = elPaddingBottom.val();
                let cmdGroup = new CommandGroupCmd('Set value', rb);
                let selectedObjects = rb.getSelectedObjects();
                for (let obj of selectedObjects) {
                    if (obj.getValue(`${fieldPrefix}paddingBottom`) !== val) {
                        cmdGroup.addCommand(new SetValueCmd(
                            obj.getId(), `rbro_${idPrefix}padding_bottom`,
                            `${fieldPrefix}paddingBottom`, val, SetValueCmd.type.text, rb));
                    }
                }
                if (!cmdGroup.isEmpty()) {
                    rb.executeCommand(cmdGroup);
                }
            });
        utils.setInputPositiveInteger(elPaddingBottom);
        elPaddingBottomDiv.append(elPaddingBottom);
        elFormField.append(elPaddingBottomDiv);
        elDiv.append(elFormField);
        elPanel.append(elDiv);
    }
}
