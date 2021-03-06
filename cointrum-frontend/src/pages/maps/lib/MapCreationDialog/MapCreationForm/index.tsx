import React from "react";
import {
  WithStyles,
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import {
  basecurrencies,
  altcurrencies,
  exchanges,
  IBaseCurrencies,
  IAltCurrencies,
  cycledurations
} from "shared-components/types";

import TypedTextField from "shared-components/form/textfield/TypedTextField";
import TypedSelect from "shared-components/form/select/TypedSelect";
import { ICreateTradingMap } from "models";

type MapCreationFormProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector> & {
    handleDismissDialog: () => void;
  };

const MapCreationForm: React.FunctionComponent<MapCreationFormProps> = ({
  classes,
  form,
  error,
  editingMap,
  updateMapName,
  updateMapDesc,
  updateMapExchange,
  updateMapBaseCurrency,
  updateMapAltCurrency,
  updateMapCycleDuration,
  handleDismissDialog,
  addMaptoLibrary,
  editMapinLibrary
}) => {
  const onSubmit = (e: any) => {
    e.preventDefault();

    const tradingMapDetails: ICreateTradingMap = {
      ...form
    };

    if (editingMap !== undefined) {
      editMapinLibrary(editingMap, tradingMapDetails)
        .then(() => {
          handleDismissDialog();
        })
        .catch(err => {});
    } else {
      addMaptoLibrary(tradingMapDetails)
        .then(() => {
          handleDismissDialog();
        })
        .catch(err => {});
    }
  };

  // To Diminish Possible X-X Currency Pairs
  let basecurs: Array<IBaseCurrencies> = [];
  let altcurs: Array<IAltCurrencies> = [];
  basecurrencies.forEach(x => {
    x !== form.altcurrency && basecurs.push(x);
  });
  altcurrencies.forEach(x => {
    x !== form.basecurrency && altcurs.push(x);
  });
  return (
    <>
      <DialogTitle id="create-trading-map">
        {editingMap !== undefined
          ? "Editing Trading Map"
          : "Create a new Trading Map"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TypedTextField
                label="Name"
                value={form.name}
                onValueChange={updateMapName}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TypedTextField
                label="Description"
                multiline
                value={form.desc}
                onValueChange={updateMapDesc}
              />
            </Grid>
            <Grid item xs={6}>
              <TypedSelect
                label="Exchange"
                value={form.exchange}
                options={exchanges}
                onValueChange={updateMapExchange}
              />
            </Grid>
            <Grid item xs={6}>
              <TypedSelect
                label="CycleDuration"
                value={form.cycleduration}
                options={cycledurations}
                onValueChange={updateMapCycleDuration}
              />
            </Grid>
            <Grid item xs={6}>
              <TypedSelect
                label="Base Currency"
                value={form.basecurrency}
                options={basecurs}
                onValueChange={updateMapBaseCurrency}
              />
            </Grid>
            <Grid item xs={6}>
              <TypedSelect
                label="Alt Currency"
                value={form.altcurrency}
                options={altcurs}
                onValueChange={updateMapAltCurrency}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDismissDialog} color={"secondary"}>
          Cancel
        </Button>
        <Button onClick={onSubmit} autoFocus>
          {editingMap !== undefined ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </>
  );
};

export default connector(wrapStyles(MapCreationForm));
