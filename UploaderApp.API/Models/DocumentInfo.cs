using System;

namespace UploaderApp.API.Models
{
    public class DocumentInfo
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string Company { get; set; }
        public string SalesforceId { get; set; }
        public string DocumentFullName { get; set; }
        public string Description { get; set; }
        public Guid UniqueLinkId { get; set; }
        public DateTime dateSent { get; set; }
        public DateTime dateViewed { get; set; }
        public DateTime dateAgreed { get; set; }
        public DateTime dateConfirmationSent { get; set; }
        public string Status { get; set; }
    }
}