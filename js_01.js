export const applications = [
  { id: 1, company: "Google", status: "applied", salary: 800000 },
  { id: 2, company: "Amazon", status: "interview", salary: 1200000 },
  { id: 3, company: "Microsoft", status: "rejected", salary: 1000000 },
  { id: 4, company: "Flipkart", status: "applied", salary: 900000 },
  { id: 5, company: "Atlassian", status: "interview", salary: 1500000 }
];

export function countByStatus (applications, status) {
    const result = applications.filter((apl) => { 
        return apl.status === status
    }
    )
    return result.length
}

export function getAverageSalary(applications){
    let total = 0
    applications.forEach(apl => {
        total = total + apl.salary
    });
    return total/applications.length
}

export function getHighestSalary(applications){
    if(applications.length === 0)
        return null
    let highest = applications[0]
    applications.forEach( apl => {
        if(apl.salary > highest.salary)
            highest = apl
    })
    return highest
}

export function filterApplications(applications, status, minSalary) {
    const filter = applications.filter( apl => apl.status === status && apl.salary === minSalary)
    return filter
}

export function removeApplication(applications,id){
    const updatedApplication = applications.filter(apl => apl.id != id)
    return updatedApplication
}

export function getApplicationById(applications, id){
    return applications.find((apl) => apl.id === id)
}

export function updateApplication(applications, id, changes){
    const application = applications.find((apl) => apl.id === id)
    if(!application)
        return null;
    const updatedApplication = Object.assign(application, changes)
    return updatedApplication
}

export function searchApplications(applications, companyName){
    return applications.filter(apl => apl.company.toLowerCase() === companyName.toLowerCase())
}

export function countByCompany(applications, companyName){
    const company = applications.filter(apl => apl.company.toLowerCase() === companyName.toLowerCase())
    return company.length
}

export function getOfferRate(applications){
    if(applications.length === 0)
        return 0
    return applications.filter(apl => apl.status === "offer").length / applications.length * 100
}

/*console.log(getOfferRate(applications))
console.log(searchApplications(applications, "amazon"))
console.log(updateApplicationStatus(applications, 1, "done"))
console.log(getApplicationById(applications, 2))
console.log(removeApplication(applications,3))
console.log(filterApplications(applications, "interview", 1200000));
console.log(getHighestSalary(applications))
console.log(getAverageSalary(applications));
console.log(countByStatus(applications, "applied"));    // 2
console.log(countByStatus(applications, "interview"));  // 2
console.log(countByStatus(applications, "rejected"));   // 1
console.log(countByStatus(applications, "offer")); */   // 0  