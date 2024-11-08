// This module contains the column configurations to display the plugins

/* eslint-disable react/prop-types */
import React from "react";
import { Input } from "reactstrap";
import {
  DefaultColumnFilter,
  SelectOptionsFilter,
  BooleanIcon,
} from "@certego/certego-ui";

import { PluginsTypes } from "../../../constants/pluginConst";
import { TlpChoices } from "../../../constants/advancedSettingsConst";
import { markdownToHtml } from "../../common/markdownToHtml";
import { TLPTag } from "../../common/TLPTag";
import {
  PluginInfoPopoverIcon,
  PluginVerificationIcon,
  PlaybooksCollapse,
} from "./utils";
import {
  OrganizationPluginStateToggle,
  PluginHealthCheckButton,
  PluginPullButton,
  PlaybooksEditButton,
  PluginDeletionButton,
  PluginEditButton,
} from "./pluginActionsButtons";
import { JobTypes } from "../../../constants/jobConst";
import TableCell from "../../common/TableCell";
import TableCellList from "../../common/TableCellList";

/* This function is available in the certego-ui, but it doesn't works:
Only the filter value "all" is shown the filter values that should be generated by the data are not generated. 

https://github.com/khulnasoft/ThreatMatrix/issues/1542
*/
function SelectColumnFilter({
  column: {
    filterValue,
    setFilter,
    preFilteredRows,
    id,
    filterValueAccessorFn,
  },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const optionsSet = new Set();
    preFilteredRows.forEach((row) => {
      const value = row.values[id];
      if (value) {
        const optVal = filterValueAccessorFn
          ? filterValueAccessorFn(value)
          : value;
        if (Array.isArray(optVal)) {
          optVal.forEach((val) => optionsSet.add(val));
        } else {
          optionsSet.add(optVal);
        }
      }
    });
    return [...optionsSet.values()];
  }, [id, preFilteredRows, filterValueAccessorFn]);

  // Set undefined to remove the filter entirely
  const onChange = (event) => setFilter(event.target.value || undefined);

  // Render a multi-select box
  return (
    <Input
      id={`datatable-select-${id}`}
      type="select"
      className="custom-select-sm input-dark"
      value={filterValue}
      onChange={onChange}
    >
      <option value="">All</option>
      {options.sort().map((value) => (
        <option key={`datatable-select-${id}-option-${value}`} value={value}>
          {value}
        </option>
      ))}
    </Input>
  );
}

// Common columns: these columns are shown for every type of plugin
const pluginTableColumns = [
  {
    Header: "Info",
    id: "info",
    accessor: (pluginConfig) => pluginConfig,
    Cell: ({ value }) => <PluginInfoPopoverIcon pluginInfo={value} />,
    disableSortBy: true,
    maxWidth: 50,
  },
  {
    Header: "Name",
    id: "name",
    accessor: "name",
    Cell: ({ value }) => (
      <TableCell isCopyToClipboard isTruncate value={value} />
    ),
    Filter: DefaultColumnFilter,
    minWidth: 150,
  },
  {
    Header: "Active",
    id: "active",
    accessor: (pluginConfig) =>
      !(pluginConfig.disabled || pluginConfig.orgPluginDisabled),
    Cell: ({ value }) => <BooleanIcon withColors truthy={value} />,
    Filter: SelectOptionsFilter,
    selectOptions: ["true", "false"],
    disableSortBy: true,
    maxWidth: 60,
  },
];

// Analyzers columns: these columns are shown for the analyzers
export const analyzersTableColumns = [
  ...pluginTableColumns,
  {
    Header: "Configured",
    id: "configured",
    accessor: "verification.configured",
    Cell: ({ row: { original } }) => (
      <PluginVerificationIcon
        pluginName={original?.name}
        verification={original?.verification}
      />
    ),
    Filter: SelectOptionsFilter,
    selectOptions: ["true", "false"],
    disableSortBy: true,
    maxWidth: 60,
  },
  {
    Header: "Description",
    id: "description",
    accessor: "description",
    Cell: ({ value }) => <span>{markdownToHtml(value)}</span>,
    disableSortBy: true,
    Filter: DefaultColumnFilter,
    minWidth: 180,
  },
  {
    Header: "Type",
    id: "type",
    accessor: "type",
    disableSortBy: true,
    Filter: SelectOptionsFilter,
    selectOptions: [JobTypes.FILE, JobTypes.OBSERVABLE],
    maxWidth: 70,
  },
  {
    Header: "Supported types",
    id: "supported_types",
    accessor: (pluginConfig) => {
      let supported;
      if (pluginConfig.type === JobTypes.OBSERVABLE) {
        supported = pluginConfig.observable_supported;
      } else {
        supported = pluginConfig.supported_filetypes;
      }
      if (supported.length === 0) {
        supported.push("everything");
      }
      return supported;
    },
    Cell: ({ value }) => (
      <TableCellList value={value} ulKey={value} size={25} />
    ),
    disableSortBy: true,
    Filter: SelectColumnFilter,
    minWidth: 200,
  },
  {
    Header: "Maximum TLP",
    id: "maximum_tlp",
    accessor: "maximum_tlp",
    Cell: ({ value }) => <TLPTag value={value} />,
    Filter: SelectOptionsFilter,
    selectOptions: TlpChoices,
    maxWidth: 80,
  },
  {
    Header: "Actions",
    id: "actions",
    accessor: (analyzerConfig) => analyzerConfig,
    disableSortBy: true,
    Cell: ({ value }) => (
      <div className="d-flex justify-content-center flex-wrap mx-2">
        {value?.python_module ===
          "basic_observable_analyzer.BasicObservableAnalyzer" && (
          <PluginEditButton
            config={value}
            pluginType_={PluginsTypes.ANALYZER}
          />
        )}
        <OrganizationPluginStateToggle
          pluginName={value?.name}
          disabled={value?.orgPluginDisabled}
          refetch={value?.refetch}
          type={PluginsTypes.ANALYZER}
        />
        <PluginHealthCheckButton
          pluginName={value.name}
          pluginType_={PluginsTypes.ANALYZER}
        />
        <PluginPullButton
          pluginName={value.name}
          pluginType_={PluginsTypes.ANALYZER}
        />
        {value?.python_module ===
          "basic_observable_analyzer.BasicObservableAnalyzer" && (
          <PluginDeletionButton
            pluginName={value.name}
            pluginType_={PluginsTypes.ANALYZER}
          />
        )}
      </div>
    ),
    maxWidth: 100,
  },
];

// Connectors columns: these columns are shown for the connectors
export const connectorTableColumns = [
  ...pluginTableColumns,
  {
    Header: "Configured",
    id: "configured",
    accessor: "verification.configured",
    Cell: ({ row: { original } }) => (
      <PluginVerificationIcon
        pluginName={original?.name}
        verification={original?.verification}
      />
    ),
    Filter: SelectOptionsFilter,
    selectOptions: ["true", "false"],
    disableSortBy: true,
    maxWidth: 60,
  },
  {
    Header: "Description",
    id: "description",
    accessor: "description",
    Cell: ({ value }) => <span>{markdownToHtml(value)}</span>,
    disableSortBy: true,
    Filter: DefaultColumnFilter,
    minWidth: 300,
  },
  {
    Header: "Maximum TLP",
    id: "maximum_tlp",
    accessor: "maximum_tlp",
    Cell: ({ value }) => <TLPTag value={value} />,
    Filter: SelectOptionsFilter,
    selectOptions: TlpChoices,
    maxWidth: 80,
  },
  {
    Header: "Actions",
    id: "actions",
    accessor: (connectorConfig) => connectorConfig,
    disableSortBy: true,
    Cell: ({ value }) => (
      <div className="d-flex justify-content-center mx-2">
        <OrganizationPluginStateToggle
          pluginName={value?.name}
          disabled={value?.orgPluginDisabled}
          refetch={value?.refetch}
          type={PluginsTypes.CONNECTOR}
        />
        <PluginHealthCheckButton
          pluginName={value?.name}
          pluginType_={PluginsTypes.CONNECTOR}
        />
        <PluginPullButton
          pluginName={value.name}
          pluginType_={PluginsTypes.CONNECTOR}
        />
      </div>
    ),
    maxWidth: 125,
  },
];

export const pivotTableColumns = [
  ...pluginTableColumns,
  {
    Header: "Configured",
    id: "configured",
    accessor: "verification.configured",
    Cell: ({ row: { original } }) => (
      <PluginVerificationIcon
        pluginName={original?.name}
        verification={original?.verification}
      />
    ),
    Filter: SelectOptionsFilter,
    selectOptions: ["true", "false"],
    disableSortBy: true,
    maxWidth: 60,
  },
  {
    Header: "Description",
    id: "description",
    accessor: "description",
    Cell: ({ value }) => <span>{markdownToHtml(value)}</span>,
    disableSortBy: true,
    Filter: DefaultColumnFilter,
    minWidth: 200,
  },
  {
    Header: "Playbook to execute",
    id: "playbook",
    accessor: "playbooks_choice",
    Cell: ({ value }) => (
      <TableCellList value={value} ulKey={value} size={20} />
    ),
    Filter: SelectColumnFilter,
    maxWidth: 145,
  },
  {
    Header: "Actions",
    id: "actions",
    accessor: (pivotConfig) => pivotConfig,
    disableSortBy: true,
    Cell: ({ value }) => (
      <div className="d-flex justify-content-center mx-2">
        <OrganizationPluginStateToggle
          pluginName={value?.name}
          disabled={value?.orgPluginDisabled}
          refetch={value?.refetch}
          type={PluginsTypes.PIVOT}
        />
        <PluginHealthCheckButton
          pluginName={value.name}
          pluginType_={PluginsTypes.PIVOT}
        />
        <PluginPullButton
          pluginName={value.name}
          pluginType_={PluginsTypes.PIVOT}
        />
        <PluginEditButton config={value} pluginType_={PluginsTypes.PIVOT} />
        <PluginDeletionButton
          pluginName={value.name}
          pluginType_={PluginsTypes.PIVOT}
        />
      </div>
    ),
    maxWidth: 125,
  },
];

// Playbooks columns: these columns are shown for the playbooks
export const playbookTableColumns = [
  ...pluginTableColumns,
  {
    Header: "Description",
    id: "description",
    accessor: "description",
    Cell: ({ value }) => <span>{markdownToHtml(value)}</span>,
    disableSortBy: true,
    Filter: DefaultColumnFilter,
    minWidth: 180,
  },
  {
    Header: "Supported types",
    id: "supported_types",
    accessor: "type",
    Cell: ({ value }) => (
      <TableCellList value={value} ulKey={value} size={20} />
    ),
    disableSortBy: true,
    Filter: SelectColumnFilter,
    maxWidth: 120,
  },
  {
    Header: "Analyzers",
    id: "analyzers",
    accessor: (row) => row.analyzers,
    Cell: ({ value }) => (
      <PlaybooksCollapse
        pluginList={value}
        pluginType_={PluginsTypes.ANALYZER}
      />
    ),
    disableSortBy: true,
    Filter: SelectColumnFilter,
    maxWidth: 145,
  },
  {
    Header: "Connectors",
    id: "connectors",
    accessor: (row) => row.connectors,
    Cell: ({ value }) => (
      <PlaybooksCollapse
        pluginList={value}
        pluginType_={PluginsTypes.CONNECTOR}
      />
    ),
    disableSortBy: true,
    Filter: SelectColumnFilter,
  },
  {
    Header: "Pivots",
    id: "pivots",
    accessor: (row) => row.pivots,
    Cell: ({ value }) => (
      <PlaybooksCollapse pluginList={value} pluginType_={PluginsTypes.PIVOT} />
    ),
    disableSortBy: true,
    Filter: SelectColumnFilter,
  },
  {
    Header: "Visualizers",
    id: "visualizers",
    accessor: (row) => row.visualizers,
    Cell: ({ value }) => (
      <PlaybooksCollapse
        pluginList={value}
        pluginType_={PluginsTypes.VISUALIZER}
      />
    ),
    disableSortBy: true,
    Filter: SelectColumnFilter,
  },
  {
    Header: "Actions",
    id: "actions",
    accessor: (playbookConfig) => playbookConfig,
    disableSortBy: true,
    Cell: ({ value }) => (
      <div className="d-flex justify-content-center mx-2">
        <OrganizationPluginStateToggle
          pluginName={value?.name}
          disabled={
            value?.owner ? !value?.for_organization : value?.orgPluginDisabled
          }
          refetch={value?.refetch}
          type={PluginsTypes.PLAYBOOK}
          pluginOwner={value?.owner}
        />
        {value.is_editable && (
          <>
            <PlaybooksEditButton playbookConfig={value} />
            <PluginDeletionButton
              pluginName={value?.name}
              pluginType_={PluginsTypes.PLAYBOOK}
            />
          </>
        )}
      </div>
    ),
    maxWidth: 100,
  },
];

// Visualizers columns: these columns are shown for the visualizers
export const visualizerTableColumns = [
  ...pluginTableColumns,
  {
    Header: "Configured",
    id: "configured",
    accessor: "verification.configured",
    Cell: ({ row: { original } }) => (
      <PluginVerificationIcon
        pluginName={original?.name}
        verification={original?.verification}
      />
    ),
    Filter: SelectOptionsFilter,
    selectOptions: ["true", "false"],
    disableSortBy: true,
    maxWidth: 60,
  },
  {
    Header: "Description",
    id: "description",
    accessor: "description",
    Cell: ({ value }) => <span>{markdownToHtml(value)}</span>,
    disableSortBy: true,
    Filter: DefaultColumnFilter,
    minWidth: 280,
  },
  {
    Header: "Playbook connected to",
    id: "playbooks",
    accessor: (row) => row.playbooks,
    Cell: ({ value }) => (
      <TableCellList
        ulKey={`visualizers-playbooks__${value}`}
        value={value}
        idPrefix="table-user-"
        keyPrefix="table-user-"
      />
    ),
    Filter: SelectColumnFilter,
    minWidth: 170,
  },
  {
    Header: "Actions",
    id: "actions",
    accessor: (visualizerConfig) => visualizerConfig,
    disableSortBy: true,
    Cell: ({ value }) => (
      <div className="d-flex justify-content-center mx-2">
        <OrganizationPluginStateToggle
          pluginName={value?.name}
          disabled={value?.orgPluginDisabled}
          refetch={value?.refetch}
          type={PluginsTypes.VISUALIZER}
        />
      </div>
    ),
    maxWidth: 90,
  },
];
// Ingestors columns: these columns are shown for the ingestors
export const ingestorTableColumns = [
  ...pluginTableColumns,
  {
    Header: "Configured",
    id: "configured",
    accessor: "verification.configured",
    Cell: ({ row: { original } }) => (
      <PluginVerificationIcon
        pluginName={original?.name}
        verification={original?.verification}
      />
    ),
    Filter: SelectOptionsFilter,
    selectOptions: ["true", "false"],
    disableSortBy: true,
    maxWidth: 60,
  },
  {
    Header: "Description",
    id: "description",
    accessor: "description",
    Cell: ({ value }) => <span>{markdownToHtml(value)}</span>,
    disableSortBy: true,
    Filter: DefaultColumnFilter,
    minWidth: 300,
  },
  {
    Header: "Playbook to execute",
    id: "playbook",
    accessor: "playbooks_choice",
    Cell: ({ value }) => (
      <TableCell isCopyToClipboard isTruncate value={value} />
    ),
    Filter: SelectColumnFilter,
    maxWidth: 200,
  },
  {
    Header: "Schedule",
    id: "schedule",
    accessor: "schedule",
    Cell: ({ value }) => (
      <span>
        {value.minute} {value.hour} {value.day_of_week} {value.day_of_month}{" "}
        {value.month_of_year}
      </span>
    ),
    disableSortBy: true,
    maxWidth: 145,
  },
  {
    Header: "Actions",
    id: "actions",
    accessor: (ingestorConfig) => ingestorConfig,
    disableSortBy: true,
    Cell: ({ value }) => (
      <div className="d-flex justify-content-center mx-2">
        <PluginHealthCheckButton
          pluginName={value.name}
          pluginType_={PluginsTypes.INGESTOR}
        />
        <PluginPullButton
          pluginName={value.name}
          pluginType_={PluginsTypes.INGESTOR}
        />
      </div>
    ),
    maxWidth: 90,
  },
];
