import './index.css'

const FiltersGroup = props => {
  const renderEmploymentTypes = () => {
    const {employmentTypesList} = props
    return (
      <ul className="filters-list-container">
        {employmentTypesList.map(eachEmployment => {
          const {label, employmentTypeId} = eachEmployment
          const {changeEmploymentType} = props
          const onChangeType = event => {
            changeEmploymentType(event.target.value)
          }
          return (
            <li key={employmentTypeId}>
              <input
                type="checkbox"
                name={employmentTypeId}
                value={employmentTypeId}
                id={employmentTypeId}
                onChange={onChangeType}
              />
              <label htmlFor={employmentTypeId} className="label-checks">
                {label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderSalaryRangeTypes = () => {
    const {salaryRangesList} = props
    return (
      <ul className="filters-list-container">
        {salaryRangesList.map(eachRange => {
          const {label, salaryRangeId} = eachRange
          const {changeSalaryRange} = props
          const onChangeSalary = event => {
            changeSalaryRange(event.target.value)
          }
          return (
            <li key={salaryRangeId}>
              <input
                type="radio"
                onChange={onChangeSalary}
                id={salaryRangeId}
                value={salaryRangeId}
                name={salaryRangeId}
              />
              <label className="label-checks" htmlFor={salaryRangeId}>
                {label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="filters-container">
      <h1 className="filter-heading">Type of Employment</h1>
      {renderEmploymentTypes()}
      <hr />
      <h1 className="filter-heading">Salary Range</h1>
      {renderSalaryRangeTypes()}
    </div>
  )
}

export default FiltersGroup
